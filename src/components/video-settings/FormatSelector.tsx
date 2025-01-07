import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormatSelector = () => {
  return (
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
  );
};

export default FormatSelector;