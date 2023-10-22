"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useQueryParams } from "@/lib/hooks/useSearchParams";

const sortOptions = [
  {
    label: "Newest",
    value: "createdAt:desc",
  },
  {
    label: "Oldest",
    value: "createdAt:asc",
  },
  {
    label: "A-Z",
    value: "name:asc",
  },
  {
    label: "Z-A",
    value: "name:desc",
  },
];

export default function Sort() {
  const { setQueryParams, queryParams } = useQueryParams<{
    sort?: string;
  }>();

  const handleValueChange = (value: string) => {
    setQueryParams({ sort: value });
  };

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={queryParams.get("sort") ?? ""}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
