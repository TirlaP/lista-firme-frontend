import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Popover } from "./Popover";
import { Button } from "./button";
import { Calendar } from "./calendar";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  label,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Popover
        trigger={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-gray-500",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : "Pick a date"}
          </Button>
        }
        content={
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setIsOpen(false);
            }}
            disabled={(date) =>
              (minDate && date < minDate) || (maxDate && date > maxDate)
            }
            initialFocus
          />
        }
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
