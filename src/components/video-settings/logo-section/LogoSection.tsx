import LogoUpload from "../LogoUpload";
import LogoPreview from "../logo-controls/LogoPreview";
import LogoControls from "../logo-controls/LogoControls";

interface LogoSectionProps {
  logoUrl?: string;
  videoPreviewUrl?: string;
  logoPosition: {
    x: number;
    y: number;
    rotation: number;
    size: number;
  };
  videoEffects: {
    brightness?: { enabled: boolean; value: number };
    contrast?: { enabled: boolean; value: number };
    desaturation?: { enabled: boolean; value: number };
    colorWash?: { enabled: boolean; color: string; intensity: number };
    zoom?: { enabled: boolean; value: number };
    stabilization?: boolean;
    fadeEffect?: { enabled: boolean; duration: number };
  };
  onLogoUploaded: (url: string) => void;
  onPositionChange: (position: {
    x: number;
    y: number;
    rotation: number;
    size: number;
  }) => void;
}

const LogoSection = ({
  logoUrl,
  videoPreviewUrl,
  logoPosition,
  videoEffects,
  onLogoUploaded,
  onPositionChange,
}: LogoSectionProps) => {
  return (
    <div className="space-y-4">
      <LogoUpload onLogoUploaded={onLogoUploaded} />
      
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
          onPositionChange={onPositionChange}
        />
      </div>
    </div>
  );
};

export default LogoSection;