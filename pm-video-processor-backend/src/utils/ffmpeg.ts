import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

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
        filters.push(`eq=brightness=${effects.brightness/100}`);
      }
      
      if (effects.contrast !== undefined) {
        filters.push(`eq=contrast=${effects.contrast/100}`);
      }
      
      if (effects.saturation !== undefined) {
        filters.push(`eq=saturation=${effects.saturation/100}`);
      }
      
      if (effects.zoom !== undefined && effects.zoom !== 100) {
        const scale = effects.zoom / 100;
        filters.push(`scale=iw*${scale}:ih*${scale}`);
      }

      if (filters.length > 0) {
        command = command.videoFilters(filters);
      }
    }

    // Add logo if specified
    if (logoPath && logoPosition) {
      command = command.input(logoPath)
        .complexFilter([
          `overlay=${logoPosition.x}:${logoPosition.y}`
        ]);
    }

    command
      .on('start', (commandLine) => {
        console.log('FFmpeg processing started:', commandLine);
      })
      .on('progress', (progress) => {
        console.log('Processing: ' + Math.floor(progress.percent || 0) + '% done');
      })
      .on('end', () => {
        console.log('FFmpeg processing completed');
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        reject(new Error(`FFmpeg error: ${err.message}`));
      })
      .save(outputPath);
  });
};