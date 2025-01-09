import { useState, useCallback } from "react";
import UploadZone from "./video-upload/UploadZone";
import VideoPreview from "./video-upload/VideoPreview";

interface VideoUploadProps {
  onFrameSelect: (frameUrl: string) => void;
}

const VideoUpload = ({ onFrameSelect }: VideoUploadProps) => {
  const [files, setFiles] = useState<(File & { preview?: string })[]>([]);

  const handleFirstFrame = useCallback((frameUrl: string) => {
    onFrameSelect(frameUrl);
  }, [onFrameSelect]);

  const handleUpload = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles(prev => [...prev, ...newFiles]);
    
    // If this is the first file, automatically select its frame
    if (files.length === 0 && newFiles.length > 0) {
      const video = document.createElement('video');
      video.src = newFiles[0].preview || '';
      video.addEventListener('loadeddata', () => {
        video.currentTime = 0;
      });
      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frameUrl = canvas.toDataURL('image/jpeg');
          handleFirstFrame(frameUrl);
        }
      });
    }
  }, [files.length, handleFirstFrame]);

  const handleRemove = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    // If removing the last file, clear the preview
    if (files.length === 1) {
      handleFirstFrame('');
    }
  }, [files.length, handleFirstFrame]);

  return (
    <div className="space-y-6">
      <UploadZone onFilesAccepted={handleUpload} />
      
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <VideoPreview
              key={file.name}
              file={file}
              onRemove={() => handleRemove(index)}
              onFirstFrame={handleFirstFrame}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;