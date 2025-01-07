import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface UploadZoneProps {
  onFilesAccepted: (files: File[]) => void;
}

const UploadZone = ({ onFilesAccepted }: UploadZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxSize: 25 * 1024 * 1024,
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

  return (
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
  );
};

export default UploadZone;