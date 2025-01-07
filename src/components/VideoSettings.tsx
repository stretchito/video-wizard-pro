import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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

const VideoSettings = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Settings</h3>
        
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