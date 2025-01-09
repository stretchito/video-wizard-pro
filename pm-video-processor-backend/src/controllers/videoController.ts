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
  try {
    if (!req.file) {
      throw new AppError('No video file uploaded', 400);
    }

    const inputPath = req.file.path;
    const outputPath = path.join('tmp/processed', `processed-${Date.now()}.mp4`);
    
    const { logoPath, logoPosition, effects } = req.body;

    const processedVideoPath = await processVideo({
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
    fs.unlinkSync(inputPath);
    fs.unlinkSync(processedVideoPath);

    res.json({
      status: 'success',
      data: {
        processedVideoPath: publicUrl,
        fileName,
      },
    });
  } catch (error) {
    next(error);
  }
};