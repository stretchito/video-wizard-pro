import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pipette } from "lucide-react";

interface ColorWashControlProps {
  onChange: (value: { enabled: boolean; color: string; intensity: number }) => void;
}

const ColorWashControl = ({ onChange }: ColorWashControlProps) => {
  const [enabled, setEnabled] = useState(false);
  const [color, setColor] = useState("#9b87f5");
  const [intensity, setIntensity] = useState([50]);

  const handleChange = (enabled: boolean) => {
    setEnabled(enabled);
    onChange({ enabled, color, intensity: intensity[0] });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange({ enabled, color: newColor, intensity: intensity[0] });
  };

  const handleIntensityChange = (newValue: number[]) => {
    setIntensity(newValue);
    onChange({ enabled, color, intensity: newValue[0] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Color Wash</Label>
        <Switch checked={enabled} onCheckedChange={handleChange} />
      </div>
      {enabled && (
        <>
          <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
            <Input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#000000"
            />
            <div className="flex gap-2">
              <Input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <button
                onClick={() => {
                  // @ts-ignore - EyeDropper API is not yet in TypeScript
                  const eyeDropper = new window.EyeDropper();
                  eyeDropper
                    .open()
                    .then((result: { sRGBHex: string }) => handleColorChange(result.sRGBHex))
                    .catch(() => {});
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Pipette className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Intensity</Label>
            <Slider
              value={intensity}
              onValueChange={handleIntensityChange}
              max={100}
              step={1}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ColorWashControl;