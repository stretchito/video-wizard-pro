import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LogoPreviewProps {
  logoUrl?: string;
  videoPreviewUrl?: string;
  position: {
    x: number;
    y: number;
    rotation: number;
    size: number;
  };
  colorWash?: {
    enabled: boolean;
    color: string;
    intensity: number;
  };
}

const LogoPreview = ({ logoUrl, videoPreviewUrl, position, colorWash }: LogoPreviewProps) => {
  const [safeZoneVisible, setSafeZoneVisible] = useState(true);

  const getLogoStyle = () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
      width: `${position.size}%`,
      left: `${position.x}%`,
      top: `${position.y}%`,
      maxWidth: '20%',
      transition: 'all 0.2s ease-out',
      zIndex: 30,
    };
    return style;
  };

  const getColorWashStyle = () => {
    if (!colorWash?.enabled) return {};
    return {
      position: 'absolute',
      inset: 0,
      backgroundColor: colorWash.color,
      opacity: colorWash.intensity / 100,
      zIndex: 20,
      pointerEvents: 'none',
    } as React.CSSProperties;
  };

  return (
    <div className="relative w-full max-w-[360px] mx-auto aspect-[9/16] bg-gray-900 rounded-[3rem] p-3 shadow-xl">
      <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-black">
        {/* Video Preview Frame (z-index: 10) */}
        {videoPreviewUrl && (
          <img 
            src={videoPreviewUrl} 
            alt="Video preview"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 10 }}
          />
        )}

        {/* Color Wash Layer (z-index: 20) */}
        {colorWash?.enabled && (
          <div style={getColorWashStyle()} />
        )}

        {/* Logo (z-index: 30) */}
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo preview"
            style={getLogoStyle()}
            className="pointer-events-none"
          />
        )}

        {/* Safe Zones (z-index: 40) */}
        {safeZoneVisible && (
          <>
            <div className="absolute inset-x-0 top-[13%] h-[74%] border-2 border-blue-500/20 pointer-events-none" style={{ zIndex: 40 }} />
            <div className="absolute inset-x-[5.5%] top-[5.6%] bottom-[16.7%] border-2 border-green-500/20 pointer-events-none" style={{ zIndex: 40 }} />
          </>
        )}
      </div>

      <button
        onClick={() => setSafeZoneVisible(!safeZoneVisible)}
        className="absolute -right-20 top-0 text-xs text-gray-500 hover:text-gray-700"
      >
        {safeZoneVisible ? 'Hide' : 'Show'} Safe Zones
      </button>
    </div>
  );
};

export default LogoPreview;