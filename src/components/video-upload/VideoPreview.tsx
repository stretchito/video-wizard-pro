import { X } from "lucide-react";

interface VideoPreviewProps {
  file: File & { preview?: string };
  onRemove: () => void;
}

const VideoPreview = ({ file, onRemove }: VideoPreviewProps) => {
  return (
    <div className="relative group animate-fadeIn">
      <video
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