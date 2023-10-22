"use client";

import { Input } from "@/components/ui";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useQueryParams } from "@/lib/hooks/useSearchParams";
import { useEffect, useState } from "react";

export default function Search() {
  const { setQueryParams, queryParams } = useQueryParams<{
    name?: string;
  }>();

  const [query, setQuery] = useState(queryParams.get("search") ?? "");
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    setQueryParams({
      name: debouncedQuery,
    });
  }, [debouncedQuery, setQueryParams]);

  return (
    <Input
      placeholder="Search..."
      className="max-w-[350px]"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
