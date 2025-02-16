// src/components/common/Pagination.tsx
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onPageChange(Math.min(Math.max(1, value), totalPages));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || isLoading}
        variant="outline"
        size="sm"
        className="hidden md:flex items-center gap-1"
      >
        <ChevronsLeft className="w-4 h-4" />
        First
      </Button>

      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={handleInputChange}
          className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md text-sm"
        />
        <span className="text-gray-500">/</span>
        <span className="text-gray-600">{totalPages}</span>
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>

      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        variant="outline"
        size="sm"
        className="hidden md:flex items-center gap-1"
      >
        Last
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  );
};