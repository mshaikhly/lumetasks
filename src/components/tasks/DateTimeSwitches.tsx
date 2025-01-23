import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DateTimeSwitchesProps } from "@/types/Task";

export const DateTimeSwitches: React.FC<DateTimeSwitchesProps> = ({
  includeTime,
  includeEndDate,
  allDay,
  onToggleTime,
  onToggleEndDate,
  onToggleAllDay,
}) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Switch
        checked={allDay}
        onCheckedChange={(checked) => {
          onToggleAllDay(checked);
        }}
      />
      <Label>All Day</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Switch
        checked={includeTime}
        onCheckedChange={(checked) => {
          onToggleTime(checked);
        }}
      />
      <Label>Include Time</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Switch
        checked={includeEndDate}
        onCheckedChange={(checked) => {
          onToggleEndDate(checked);
        }}
      />
      <Label>Include End Date</Label>
    </div>
  </div>
);
