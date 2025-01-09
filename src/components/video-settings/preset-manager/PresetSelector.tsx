import { useEffect, useState } from "react";
import { VideoPreset } from "@/types/preset";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PresetSelectorProps {
  onPresetLoad: (preset: VideoPreset) => void;
}

const PresetSelector = ({ onPresetLoad }: PresetSelectorProps) => {
  const [presets, setPresets] = useState<VideoPreset[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    const { data, error } = await supabase
      .from('processing_presets')
      .select('*');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load presets",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      setPresets(data.map(preset => ({
        id: preset.id,
        name: preset.name,
        logoPosition: (preset.settings as any).logoPosition,
        videoEffects: (preset.settings as any).videoEffects,
      })));
    }
  };

  const handlePresetSelect = async (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      onPresetLoad(preset);
    }
  };

  return presets.length > 0 ? (
    <div className="space-y-2">
      <label className="text-sm font-medium">User Presets</label>
      <Select onValueChange={handlePresetSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
          {presets.map((preset) => (
            <SelectItem key={preset.id} value={preset.id}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ) : null;
};

export default PresetSelector;