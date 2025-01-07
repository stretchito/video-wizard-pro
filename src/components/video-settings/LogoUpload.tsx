import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const LogoUpload = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Logo file size must be under 2MB");
        return;
      }
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeLogo = () => {
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogo(null);
    setLogoPreview("");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Logo Upload</label>
      {!logo ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag & drop your logo here, or click to select
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF (max 2MB)
          </p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={logoPreview}
            alt="Logo preview"
            className="max-h-32 rounded border border-gray-200"
          />
          <button
            onClick={removeLogo}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg 
              opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoUpload;