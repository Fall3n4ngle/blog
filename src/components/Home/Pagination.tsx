"use client";

import { Button } from "@/components/ui/Button";
import { useQueryParams } from "@/lib/hooks/useSearchParams";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  totalPages: number;
  dictionary: {
    prev: string;
    next: string;
  };
};

export default function Pagination({ totalPages, dictionary }: Props) {
  const { queryParams, setQueryParams } = useQueryParams<{
    page?: number;
  }>();

  const currentPage = queryParams.get("page") ?? "1";

  const handlePrevClick = () => {
    setQueryParams({ page: +currentPage - 1 });
  };

  const handleNextClick = () => {
    setQueryParams({ page: +currentPage + 1 });
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={handlePrevClick}
        disabled={+currentPage === 1}
      >
        <ChevronLeft className="mr-2 h-5 w-5" /> {dictionary.prev}
      </Button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <Button
        variant="ghost"
        onClick={handleNextClick}
        disabled={+currentPage === totalPages}
      >
        {dictionary.next} <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
