import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoUpload from "./video-settings/LogoUpload";
import FormatSelector from "./video-settings/FormatSelector";
import AdvancedSettings from "./video-settings/AdvancedSettings";
import LogoPreview from "./video-settings/logo-controls/LogoPreview";
import LogoControls from "./video-settings/logo-controls/LogoControls";

interface VideoSettingsProps {
  videoPreviewUrl?: string;
}

const VideoSettings = ({ videoPreviewUrl }: VideoSettingsProps) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [logoPosition, setLogoPosition] = useState({
    x: 50,
    y: 50,
    rotation: 0,
    size: 15
  });
  const [logoUrl, setLogoUrl] = useState<string>();
  const [colorWash, setColorWash] = useState({
    enabled: false,
    color: "#000000",
    intensity: 50
  });

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <LogoUpload onLogoUploaded={setLogoUrl} />
      
      <div className="space-y-4">
        <LogoPreview 
          logoUrl={logoUrl}
          videoPreviewUrl={videoPreviewUrl}
          position={logoPosition}
          colorWash={colorWash}
        />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Logo Position</h3>
          <LogoControls
            position={logoPosition}
            onPositionChange={setLogoPosition}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Settings</h3>
        <FormatSelector />
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
          <AdvancedSettings 
            onColorWashChange={(colorWashSettings) => setColorWash(colorWashSettings)}
          />
        )}
      </div>

      <Button className="w-full" size="lg">
        Process Videos
      </Button>
    </div>
  );
};

export default VideoSettings;