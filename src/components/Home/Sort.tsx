"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useQueryParams } from "@/lib/hooks/useSearchParams";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Record<string, Option>;
  placeholder: string;
};

export default function Sort({ options, placeholder }: Props) {
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
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(options).map((item) => {
          const { label, value } = options[item];

          return (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
