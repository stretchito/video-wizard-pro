import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoPreviewProps {
  file: File & { preview?: string };
  onRemove: () => void;
  onFirstFrame?: (frameUrl: string) => void;
}

const VideoPreview = ({ file, onRemove, onFirstFrame }: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && onFirstFrame) {
      const video = videoRef.current;
      
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
          onFirstFrame(frameUrl);
        }
      });
    }
  }, [onFirstFrame]);

  return (
    <div className="relative group animate-fadeIn">
      <video
        ref={videoRef}
        src={file.preview}
        className="w-full h-40 object-cover rounded-lg"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg 
          opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={16} className="text-gray-600" />
      </button>
      <p className="mt-2 text-sm text-gray-600 truncate">{file.name}</p>
      <p className="text-xs text-gray-500">
        {(file.size / (1024 * 1024)).toFixed(1)}MB
      </p>
    </div>
  );
};

export default VideoPreview;