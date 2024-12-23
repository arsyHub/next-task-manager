import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const MultiSelect = ({ options }: { options: string[] }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if already selected
          : [...prev, option] // Add if not selected
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : "Select options"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <Checkbox
                checked={selectedOptions.includes(option)}
                onCheckedChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
