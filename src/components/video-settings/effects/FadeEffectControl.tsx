import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface FadeEffectControlProps {
  onChange: (value: { enabled: boolean; duration: number }) => void;
}

const FadeEffectControl = ({ onChange }: FadeEffectControlProps) => {
  const [enabled, setEnabled] = useState(false);
  const [duration, setDuration] = useState("0.5");

  const handleChange = (enabled: boolean) => {
    setEnabled(enabled);
    onChange({ enabled, duration: parseFloat(duration) });
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    onChange({ enabled, duration: parseFloat(value) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Fade Effects</Label>
        <Switch checked={enabled} onCheckedChange={handleChange} />
      </div>
      {enabled && (
        <div className="space-y-2">
          <Label>Duration</Label>
          <Select value={duration} onValueChange={handleDurationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5 seconds</SelectItem>
              <SelectItem value="0.75">0.75 seconds</SelectItem>
              <SelectItem value="1">1 second</SelectItem>
              <SelectItem value="1.5">1.5 seconds</SelectItem>
              <SelectItem value="2">2 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default FadeEffectControl;