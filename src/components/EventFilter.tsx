// src/components/EventFilter.tsx
'use client';

import CustomSelect from '@/components/ui/CustomSelect';
import { useState } from 'react';
import type { EventFilter } from '@/types/event';

interface EventFilterProps {
  onFilter?: (filters: EventFilter) => void;
  onReset?: () => void;
}

const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "Workshop", value: "workshop" },
  { label: "Webinar", value: "webinar" },
  { label: "Conference", value: "conference" },
  { label: "Bootcamp", value: "bootcamp" },
  { label: "Meetup", value: "meetup" },
];

const languageOptions = [
  { label: "All Languages", value: "all" },
  { label: "Hindi", value: "hindi" },
  { label: "English", value: "english" },
  { label: "Marathi", value: "marathi" },
  { label: "Telugu", value: "telugu" },
  { label: "Tamil", value: "tamil" },
];

const priceRangeOptions = [
  { label: "All Prices", value: "all" },
  { label: "Free", value: "free" },
  { label: "₹0 - ₹500", value: "0-500" },
  { label: "₹500 - ₹1000", value: "500-1000" },
  { label: "₹1000 - ₹5000", value: "1000-5000" },
  { label: "₹5000+", value: "5000+" },
];

export default function EventFilter({ onFilter, onReset }: EventFilterProps) {
  const [filters, setFilters] = useState<EventFilter>({
    category: "all",
    language: "all",
    priceRange: "all",
  });

  const handleFilterChange = (key: keyof EventFilter, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleReset = () => {
    const emptyFilters: EventFilter = {
      category: "all",
      language: "all",
      priceRange: "all",
    };
    setFilters(emptyFilters);
    onReset?.();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 sticky top-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Filter Events</h2>

      {/* Category Filter */}
      <CustomSelect
        label="Category"
        options={categoryOptions}
        placeholder="Select category"
        groupLabel="Event Categories"
        defaultValue={filters.category}
        onValueChange={(value) => handleFilterChange('category', value)}
      />

      {/* Language Filter */}
      <CustomSelect
        label="Language"
        options={languageOptions}
        placeholder="Select language"
        groupLabel="Languages"
        defaultValue={filters.language}
        onValueChange={(value) => handleFilterChange('language', value)}
      />

      {/* Price Range Filter */}
      <CustomSelect
        label="Price Range"
        options={priceRangeOptions}
        placeholder="Select price range"
        groupLabel="Price Ranges"
        defaultValue={filters.priceRange}
        onValueChange={(value) => handleFilterChange('priceRange', value)}
      />

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
}