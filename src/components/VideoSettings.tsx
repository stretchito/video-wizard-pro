import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoUpload from "./video-settings/LogoUpload";
import FormatSelector from "./video-settings/FormatSelector";
import AdvancedSettings from "./video-settings/AdvancedSettings";
import LogoPreview from "./video-settings/logo-controls/LogoPreview";
import LogoControls from "./video-settings/logo-controls/LogoControls";
import PresetManager from "./video-settings/PresetManager";
import { VideoPreset } from "@/types/preset";

interface VideoSettingsProps {
  videoPreviewUrl?: string;
}

interface VideoEffects {
  brightness?: { enabled: boolean; value: number };
  contrast?: { enabled: boolean; value: number };
  desaturation?: { enabled: boolean; value: number };
  colorWash?: { enabled: boolean; color: string; intensity: number };
  zoom?: { enabled: boolean; value: number };
  stabilization?: boolean;
  fadeEffect?: { enabled: boolean; duration: number };
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
  const [videoEffects, setVideoEffects] = useState<VideoEffects>({
    brightness: { enabled: false, value: 50 },
    contrast: { enabled: false, value: 50 },
    desaturation: { enabled: false, value: 100 },
    colorWash: { enabled: false, color: "#000000", intensity: 50 },
    zoom: { enabled: false, value: 100 },
    stabilization: false,
    fadeEffect: { enabled: false, duration: 0.5 }
  });

  const handlePresetLoad = (preset: VideoPreset) => {
    setLogoPosition(preset.logoPosition);
    setVideoEffects(preset.videoEffects);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <LogoUpload onLogoUploaded={setLogoUrl} />
      
      <PresetManager
        currentSettings={{
          logoPosition,
          videoEffects,
        }}
        onPresetLoad={handlePresetLoad}
      />
      
      <div className="space-y-4">
        <LogoPreview 
          logoUrl={logoUrl}
          videoPreviewUrl={videoPreviewUrl}
          position={logoPosition}
          videoEffects={videoEffects}
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
            effects={videoEffects}
            onEffectsChange={setVideoEffects}
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