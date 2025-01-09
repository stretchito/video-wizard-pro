import { Request, Response, NextFunction } from 'express';
import { processVideo } from '../utils/ffmpeg';
import { AppError } from '../middleware/errorHandler';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import winston from 'winston';
import { 
  videoProcessingDuration,
  videoProcessingErrors,
  activeProcessingJobs,
  updateStorageUsage
} from '../utils/metrics';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const processVideoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  let inputPath: string | undefined;
  let processedVideoPath: string | undefined;

  try {
    activeProcessingJobs.inc();
    logger.info('Starting video processing request', {
      headers: req.headers,
      body: req.body,
      file: req.file
    });

    if (!req.file) {
      logger.error('No video file uploaded');
      videoProcessingErrors.inc({ error_type: 'no_file' });
      throw new AppError('No video file uploaded', 400);
    }

    // Get file size
    const stats = fs.statSync(req.file.path);
    const fileSizeInMB = stats.size / (1024 * 1024);
    
    logger.info('File size check', { 
      fileSizeInMB,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype
    });

    // Check if file is too large (25MB limit)
    if (fileSizeInMB > 25) {
      logger.error('File size exceeds limit', { fileSizeInMB });
      videoProcessingErrors.inc({ error_type: 'file_too_large' });
      throw new AppError('File size exceeds 25MB limit', 400);
    }

    inputPath = req.file.path;
    const outputPath = path.join('tmp/processed', `processed-${Date.now()}.mp4`);
    
    const { logoPath, logoPosition, effects } = req.body;

    logger.info('Processing video with options', {
      logoPath,
      logoPosition,
      effects,
      inputPath,
      outputPath
    });

    processedVideoPath = await processVideo({
      inputPath,
      outputPath,
      logoPath,
      logoPosition: logoPosition ? JSON.parse(logoPosition) : undefined,
      effects: effects ? JSON.parse(effects) : undefined,
    });

    logger.info('Video processed successfully, uploading to Supabase');

    // Upload processed video to Supabase storage
    const fileStream = fs.createReadStream(processedVideoPath);
    const fileName = `processed-${Date.now()}.mp4`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(`processed/${fileName}`, fileStream, {
        contentType: 'video/mp4',
        upsert: false
      });

    if (uploadError) {
      logger.error('Supabase upload error', uploadError);
      videoProcessingErrors.inc({ error_type: 'upload_error' });
      throw new AppError('Failed to upload processed video: ' + uploadError.message, 500);
    }

    // Update storage metrics
    const processedStats = fs.statSync(processedVideoPath);
    await updateStorageUsage(processedStats.size);

    // Get public URL for the uploaded video
    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(`processed/${fileName}`);

    // Record processing duration
    const duration = (Date.now() - startTime) / 1000;
    videoProcessingDuration.observe(duration);

    logger.info('Upload successful, cleaning up temporary files');

    // Clean up temporary files
    if (inputPath && fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }
    if (processedVideoPath && fs.existsSync(processedVideoPath)) {
      fs.unlinkSync(processedVideoPath);
    }

    res.json({
      status: 'success',
      data: {
        processedVideoPath: publicUrl,
        fileName,
      },
    });
  } catch (error) {
    logger.error('Error in video processing', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
      inputPath,
      processedVideoPath
    });

    videoProcessingErrors.inc({ error_type: 'processing_error' });

    // Clean up temporary files in case of error
    try {
      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }
      if (processedVideoPath && fs.existsSync(processedVideoPath)) {
        fs.unlinkSync(processedVideoPath);
      }
    } catch (cleanupError) {
      logger.error('Error cleaning up temporary files:', cleanupError);
    }
    
    next(error);
  } finally {
    activeProcessingJobs.dec();
  }
};
