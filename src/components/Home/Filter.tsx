"use client";

import { Badge } from "@/components/ui";
import { useQueryParams } from "@/lib/hooks/useSearchParams";
import { useEffect, useState } from "react";

type Props = {
  categories: Category[];
};

export default function Filter({ categories }: Props) {
  const { queryParams, setQueryParams } = useQueryParams<{
    category?: string;
  }>();

  const [selectedCategories, setSelectedCategories] = useState(
    queryParams.get("category")?.split(".") ?? []
  );

  const checked = (slug: string) => {
    return selectedCategories.includes(slug);
  };

  const handleClick = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories((prev) => prev.filter((s) => s !== slug));
      return;
    }

    setSelectedCategories((prev) => [...prev, slug]);
  };

  useEffect(() => {
    const category = selectedCategories.length
      ? selectedCategories.join(".")
      : undefined;

    setQueryParams({ category });
  }, [selectedCategories, setQueryParams]);

  return (
    <div className="flex items-center gap-3">
      {categories.map(({ attributes, id }) => {
        const isChecked = checked(attributes.slug);

        return (
          <Badge
            key={id}
            variant={isChecked ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => handleClick(attributes.slug)}
          >
            {attributes.name}
          </Badge>
        );
      })}
    </div>
  );
}
