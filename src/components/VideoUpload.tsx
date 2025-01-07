import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface VideoFile extends File {
  preview?: string;
}

const VideoUpload = () => {
  const [files, setFiles] = useState<VideoFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );

    setFiles(prev => {
      const combined = [...prev, ...newFiles];
      const totalSize = combined.reduce((sum, file) => sum + file.size, 0);
      
      if (totalSize > 500 * 1024 * 1024) { // 500MB
        toast.error("Total batch size exceeds 500MB limit");
        return prev;
      }
      
      return combined;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxSize: 25 * 1024 * 1024, // 25MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ file, errors }) => {
        if (errors[0]?.code === "file-too-large") {
          toast.error(`${file.name} is too large. Max size is 25MB`);
        } else {
          toast.error(`${file.name} is not a supported video format`);
        }
      });
    },
  });

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
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag & drop videos here, or click to select files
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: MP4, MOV, AVI, WEBM (max 25MB per file)
        </p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group animate-fadeIn">
              <video
                src={file.preview}
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={() => removeFile(index)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;