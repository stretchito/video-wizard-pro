import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProcessingSectionProps {
  isProcessing: boolean;
  progress: number;
  onProcess: () => Promise<void>;
}

const ProcessingSection = ({ isProcessing, progress, onProcess }: ProcessingSectionProps) => {
  return (
    <div className="space-y-4">
      {isProcessing ? (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 text-center">Processing video... {progress}%</p>
        </div>
      ) : (
        <Button 
          className="w-full" 
          size="lg" 
          onClick={onProcess}
          disabled={isProcessing}
        >
          Process Videos
        </Button>
      )}
    </div>
  );
};

export default ProcessingSection;