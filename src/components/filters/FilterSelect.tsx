"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Option = {
  label: string
  value: string
}

type Props = {
  placeholder: string
  options: Option[]
  value?: string
  onChange: (value: string) => void
}

export default function FilterSelect({
  placeholder,
  options,
  value,
  onChange,
}: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="
          h-10 w-[170px]
          rounded-lg p-5
          border border-border
          bg-white
          text-sm
          focus:border-primary-500
          focus:ring-2
          focus:ring-primary-500/30
        "
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        position="popper"
        sideOffset={0}
        className="bg-white border border-border shadow-md rounded-lg"
      >
        {options.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="
              cursor-pointer
              focus:bg-primary-500
              focus:text-white
            "
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}