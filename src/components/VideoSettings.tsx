import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoUpload from "./video-settings/LogoUpload";
import FormatSelector from "./video-settings/FormatSelector";
import AdvancedSettings from "./video-settings/AdvancedSettings";

const VideoSettings = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Settings</h3>
        <LogoUpload />
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

        {isAdvancedOpen && <AdvancedSettings />}
      </div>

      <Button className="w-full" size="lg">
        Process Videos
      </Button>
    </div>
  );
};

export default VideoSettings;