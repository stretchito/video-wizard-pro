import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SavePresetDialogProps {
  currentSettings: {
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
  };
}

const SavePresetDialog = ({ currentSettings }: SavePresetDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const { toast } = useToast();

  const savePreset = async () => {
    if (!presetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a preset name",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save presets",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('processing_presets')
      .insert({
        name: presetName,
        settings: currentSettings,
        user_id: user.id
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save preset",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Preset saved successfully",
    });

    setPresetName("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          Save As Preset
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Current Settings as Preset</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Preset Name</label>
            <Input
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name"
            />
          </div>
          <Button onClick={savePreset}>Save Preset</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavePresetDialog;