import { DateTimePopover } from "./DateTimePopover";
import { DateTimePickerCellProps } from "@/types/Task";

export const DateTimePickerCell: React.FC<DateTimePickerCellProps> = ({ id, value, onEdit }) => {
  console.log("DateTimePickerCell value:", value);
  return <DateTimePopover id={id} value={value} onEdit={onEdit} />;
};
