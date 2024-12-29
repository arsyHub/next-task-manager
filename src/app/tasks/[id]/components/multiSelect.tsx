import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Option = {
  id: string;
  label: string;
  email?: string;
};

interface MultiSelectProps {
  options: Option[];
  defaultValue?: string[];
  onChange?: (selectedValues: string[]) => void;
  trigger?: React.ReactNode;
}

export const MultiSelect = ({
  defaultValue = [],
  options,
  onChange,
  trigger,
}: MultiSelectProps) => {
  const [selectedOptionIds, setSelectedOptionIds] =
    useState<string[]>(defaultValue);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setSelectedOptionIds(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOption = (optionId: string) => {
    setSelectedOptionIds((prev) => {
      const updatedSelection = prev.includes(optionId)
        ? prev.filter((id) => id !== optionId) // Remove if already selected
        : [...prev, optionId]; // Add if not selected

      // Trigger onChange callback if provided
      if (onChange) {
        onChange(updatedSelection); // Pass the updated selected values
      }

      return updatedSelection;
    });
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the labels of the selected options
  const selectedLabels = selectedOptionIds
    .map((id) => options.find((option) => option.id === id)?.label)
    .filter(Boolean) // Remove undefined values
    .join(", ");

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            {selectedLabels}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="min-w-full p-2">
        <div className="flex flex-col gap-2">
          {/* Input Search with Icon */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-gray-400" />
            </span>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9" // Add padding to the left for the icon
            />
          </div>
          {/* Option List */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedOptionIds.includes(option.id)}
                  onCheckedChange={() => toggleOption(option.id)}
                />
                {option.label}
                <span className="text-xs text-gray-500">({option.email})</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No options found.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
