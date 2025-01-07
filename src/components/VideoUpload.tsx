import { useState, useCallback } from "react";
import UploadZone from "./video-upload/UploadZone";
import VideoPreview from "./video-upload/VideoPreview";

interface VideoFile extends File {
  preview?: string;
}

const VideoUpload = () => {
  const [files, setFiles] = useState<VideoFile[]>([]);

  const handleFilesAccepted = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );

    setFiles(prev => {
      const combined = [...prev, ...newFiles];
      const totalSize = combined.reduce((sum, file) => sum + file.size, 0);
      
      if (totalSize > 500 * 1024 * 1024) {
        toast.error("Total batch size exceeds 500MB limit");
        return prev;
      }
      
      return combined;
    });
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview || "");
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="space-y-6">
      <UploadZone onFilesAccepted={handleFilesAccepted} />

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <VideoPreview
              key={index}
              file={file}
              onRemove={() => removeFile(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;