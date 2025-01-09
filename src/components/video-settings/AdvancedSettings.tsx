import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdvancedSettings = () => {
  const [colorWash, setColorWash] = useState("#9b87f5");
  const [colorIntensity, setColorIntensity] = useState([50]);
  const [desaturation, setDesaturation] = useState([0]);
  const [logoX, setLogoX] = useState([10]); // percentage from left
  const [logoY, setLogoY] = useState([10]); // percentage from top
  const [logoRotation, setLogoRotation] = useState([0]); // degrees

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorWash(e.target.value);
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="space-y-4 border-b pb-4">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium">Logo Position</h4>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust the position and rotation of your logo</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Horizontal Position (X)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Position from left edge of video</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider 
              value={logoX}
              onValueChange={setLogoX}
              max={100} 
              step={1}
            />
            <div className="text-xs text-gray-500 text-right">
              {logoX}%
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Vertical Position (Y)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Position from top edge of video</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider 
              value={logoY}
              onValueChange={setLogoY}
              max={100} 
              step={1}
            />
            <div className="text-xs text-gray-500 text-right">
              {logoY}%
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Rotation</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rotate your logo (in degrees)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider 
              value={logoRotation}
              onValueChange={setLogoRotation}
              min={-180}
              max={180} 
              step={1}
            />
            <div className="text-xs text-gray-500 text-right">
              {logoRotation}°
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Brightness</label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust the overall brightness of the video</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Contrast</label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust the difference between light and dark areas</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Logo Opacity</label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Control the transparency of your logo overlay</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Slider defaultValue={[100]} max={100} step={1} />
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium">Color Wash</h4>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Apply a colored overlay to your video</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="colorWash">Color</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter a hex code or use the color picker</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="text"
              id="colorWash"
              value={colorWash}
              onChange={handleColorChange}
              placeholder="#000000 or rgb(0,0,0)"
            />
          </div>
          <div className="mt-7">
            <Input
              type="color"
              value={colorWash}
              onChange={handleColorChange}
              className="w-12 h-10 p-1 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Intensity</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Control how strong the color wash effect appears</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Slider 
            value={colorIntensity}
            onValueChange={setColorIntensity}
            max={100} 
            step={1}
          />
          <div className="text-xs text-gray-500 text-right">
            {colorIntensity}%
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Desaturation</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove color from the original video (does not affect logo or color wash)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Slider 
            value={desaturation}
            onValueChange={setDesaturation}
            max={100} 
            step={1}
          />
          <div className="text-xs text-gray-500 text-right">
            {desaturation}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Video Stabilization</label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Reduce camera shake and smooth out video motion</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Fade Effects</label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add smooth fade in/out transitions to your video</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Switch />
      </div>
    </div>
  );
};

export default AdvancedSettings;
