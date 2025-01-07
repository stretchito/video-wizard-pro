import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, Upload, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const VideoSettings = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
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
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Settings</h3>
        
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Output Format</label>
          <Select defaultValue="mp4">
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mp4">MP4</SelectItem>
              <SelectItem value="mov">MOV</SelectItem>
              <SelectItem value="avi">AVI</SelectItem>
              <SelectItem value="webm">WEBM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Logo Position</label>
          <Select defaultValue="top-right">
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="center">Center</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary"
        >
          {isAdvancedOpen ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
          <span>Advanced Settings</span>
        </button>

        {isAdvancedOpen && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brightness</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contrast</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Logo Opacity</label>
              <Slider defaultValue={[100]} max={100} step={1} />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Video Stabilization</label>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fade Effects</label>
              <Switch />
            </div>
          </div>
        )}
      </div>

      <Button className="w-full" size="lg">
        Process Videos
      </Button>
    </div>
  );
};

export default VideoSettings;