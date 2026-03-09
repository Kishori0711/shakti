// src/components/ui/CustomSelect.tsx
'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';

interface SelectOption {
  label: string;
  value: string | null;
}

interface CustomSelectProps {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  groupLabel?: string;
  disabled?: boolean;
}

export default function CustomSelect({
  options,
  label,
  placeholder,
  onValueChange,
  defaultValue,
  className = "w-full",
  groupLabel = "Options",
  disabled = false,
}: CustomSelectProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Select 
        value={selectedValue} 
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{groupLabel}</SelectLabel>
            {options.map((option) => (
              <SelectItem 
                key={option.value || 'empty'} 
                value={option.value || ""}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}