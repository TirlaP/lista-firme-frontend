// src/components/companies/CompanyPagination.tsx
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CompanyPaginationProps {
  hasMore: boolean;
  hasPrevious: boolean;
  loadMore: () => void;
  loadPrevious: () => void;
  isLoading: boolean;
}

export const CompanyPagination = ({
  hasMore,
  hasPrevious,
  loadMore,
  loadPrevious,
  isLoading,
}: CompanyPaginationProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={loadPrevious}
        disabled={!hasPrevious || isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <Button
        onClick={loadMore}
        disabled={!hasMore || isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};