import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import winston from 'winston';

// Configure winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

interface VideoProcessingOptions {
  inputPath: string;
  outputPath: string;
  logoPath?: string;
  logoPosition?: {
    x: number;
    y: number;
    size: number;
    rotation: number;
  };
  effects?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    zoom?: number;
  };
}

export const processVideo = async (options: VideoProcessingOptions): Promise<string> => {
  const {
    inputPath,
    outputPath,
    logoPath,
    logoPosition,
    effects,
  } = options;

  logger.info('Starting video processing with options:', {
    inputPath,
    outputPath,
    logoPosition,
    effects
  });

  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath)
      // Add memory optimization flags
      .outputOptions([
        '-max_muxing_queue_size 1024',
        '-y', // Overwrite output files without asking
        '-preset ultrafast', // Use fastest encoding preset
        '-movflags +faststart', // Optimize for web playback
        '-maxrate 2M', // Limit bitrate to 2 Mbps
        '-bufsize 4M', // Use a 4MB buffer
      ]);

    // Apply effects if specified
    if (effects) {
      const filters: string[] = [];
      
      if (effects.brightness !== undefined) {
        const normalizedBrightness = effects.brightness / 100;
        logger.info('Applying brightness effect:', normalizedBrightness);
        filters.push(`eq=brightness=${normalizedBrightness}`);
      }
      
      if (effects.contrast !== undefined) {
        const normalizedContrast = effects.contrast / 100;
        logger.info('Applying contrast effect:', normalizedContrast);
        filters.push(`eq=contrast=${normalizedContrast}`);
      }
      
      if (effects.saturation !== undefined) {
        const normalizedSaturation = effects.saturation / 100;
        logger.info('Applying saturation effect:', normalizedSaturation);
        filters.push(`eq=saturation=${normalizedSaturation}`);
      }
      
      if (effects.zoom !== undefined && effects.zoom !== 100) {
        const scale = effects.zoom / 100;
        logger.info('Applying zoom effect:', scale);
        filters.push(`scale=iw*${scale}:ih*${scale}`);
      }

      if (filters.length > 0) {
        command = command.videoFilters(filters);
      }
    }

    // Add logo if specified
    if (logoPath && logoPosition) {
      logger.info('Adding logo with position:', logoPosition);
      command = command.input(logoPath)
        .complexFilter([
          `overlay=${logoPosition.x}:${logoPosition.y}`
        ]);
    }

    command
      .on('start', (commandLine) => {
        logger.info('FFmpeg processing started:', commandLine);
      })
      .on('progress', (progress) => {
        logger.info('Processing progress:', progress);
      })
      .on('end', () => {
        logger.info('FFmpeg processing completed');
        resolve(outputPath);
      })
      .on('error', (err) => {
        logger.error('FFmpeg error:', err);
        reject(new Error(`FFmpeg error: ${err.message}`));
      })
      .save(outputPath);
  });
};