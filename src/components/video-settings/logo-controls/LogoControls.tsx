import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LogoControlsProps {
  position: {
    x: number;
    y: number;
    rotation: number;
    size: number;
  };
  onPositionChange: (position: {
    x: number;
    y: number;
    rotation: number;
    size: number;
  }) => void;
}

const PRESET_POSITIONS = {
  'Upper Left': { x: 15, y: 15, rotation: 0, size: 15 },
  'Upper Right': { x: 85, y: 15, rotation: 0, size: 15 },
  'Lower Third': { x: 50, y: 70, rotation: 0, size: 20 },
  'Center': { x: 50, y: 50, rotation: 0, size: 20 },
};

const LogoControls = ({ position, onPositionChange }: LogoControlsProps) => {
  const handlePresetClick = (preset: keyof typeof PRESET_POSITIONS) => {
    onPositionChange(PRESET_POSITIONS[preset]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.keys(PRESET_POSITIONS).map((preset) => (
          <Button
            key={preset}
            variant="outline"
            size="sm"
            onClick={() => handlePresetClick(preset as keyof typeof PRESET_POSITIONS)}
          >
            {preset}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Horizontal Position</label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Position from left edge (respects safe zones)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Slider
            value={[position.x]}
            onValueChange={([x]) => onPositionChange({ ...position, x })}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Vertical Position</label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Position from top edge (respects safe zones)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Slider
            value={[position.y]}
            onValueChange={([y]) => onPositionChange({ ...position, y })}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Size</label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Logo size (max 20% of screen)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Slider
            value={[position.size]}
            onValueChange={([size]) => onPositionChange({ ...position, size })}
            max={20}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Rotation</label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate logo (in degrees)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Slider
            value={[position.rotation]}
            onValueChange={([rotation]) => onPositionChange({ ...position, rotation })}
            min={-180}
            max={180}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoControls;