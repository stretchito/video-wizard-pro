import { Request, Response, NextFunction } from 'express';
import { processVideo } from '../utils/ffmpeg';
import { AppError } from '../middleware/errorHandler';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const processVideoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let inputPath: string | undefined;
  let processedVideoPath: string | undefined;

  try {
    if (!req.file) {
      throw new AppError('No video file uploaded', 400);
    }

    // Get file size
    const stats = fs.statSync(req.file.path);
    const fileSizeInMB = stats.size / (1024 * 1024);
    
    // Check if file is too large (25MB limit)
    if (fileSizeInMB > 25) {
      throw new AppError('File size exceeds 25MB limit', 400);
    }

    inputPath = req.file.path;
    const outputPath = path.join('tmp/processed', `processed-${Date.now()}.mp4`);
    
    const { logoPath, logoPosition, effects } = req.body;

    processedVideoPath = await processVideo({
      inputPath,
      outputPath,
      logoPath,
      logoPosition: logoPosition ? JSON.parse(logoPosition) : undefined,
      effects: effects ? JSON.parse(effects) : undefined,
    });

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
      throw new AppError('Failed to upload processed video', 500);
    }

    // Get public URL for the uploaded video
    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(`processed/${fileName}`);

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
    // Clean up temporary files in case of error
    try {
      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }
      if (processedVideoPath && fs.existsSync(processedVideoPath)) {
        fs.unlinkSync(processedVideoPath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up temporary files:', cleanupError);
    }
    
    next(error);
  }
};