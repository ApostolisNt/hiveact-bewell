import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { cx } from "../utils/general";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  className?: string;
  disabled?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onChange,
  className,
  disabled,
}) => {
  //   if (totalPages <= 1) return null;

  const first = [1, 2, 3].filter((p) => p <= totalPages);
  const last = [totalPages - 1, totalPages].filter(
    (p) => p > 3 && p <= totalPages
  );

  const inFirst = currentPage <= 3;
  const inLast = currentPage >= totalPages - 1;

  const middle =
    !inFirst && !inLast && currentPage > 3 && currentPage < totalPages - 1
      ? [currentPage]
      : [];

  const hasLeftGap =
    last.length > 0 && first[first.length - 1] + 1 < (middle[0] ?? last[0]);
  const hasRightGap =
    middle.length > 0 && middle[middle.length - 1] + 1 < last[0];

  const go = (p: number) =>
    !disabled && onChange(Math.min(Math.max(p, 1), totalPages));

  const Btn = ({
    label,
    page,
    active,
    isDisabled,
  }: {
    label: React.ReactNode;
    page?: number;
    active?: boolean;
    isDisabled?: boolean;
  }) => (
    <button
      disabled={isDisabled}
      onClick={() => page && go(page)}
      className={cx(
        "min-w-10 h-10 px-3 rounded-full border transition",
        "flex items-center justify-center text-sm md:text-base",
        active
          ? "border-primary-pink text-primary-pink font-bold bg-secondary-pink"
          : "border-transparent text-black hover:bg-secondary-pink/60",
        (isDisabled || disabled) && "opacity-50 cursor-not-allowed"
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );

  const Dot = () => (
    <span className="px-2 text-light-gray select-none leading-none">…</span>
  );

  return (
    <nav
      className={cx(
        "w-full flex items-center justify-center gap-1 md:gap-2 select-none",
        className
      )}
      aria-label="pagination"
    >
      <Btn
        label={<ChevronLeft className="w-4 h-4" />}
        page={currentPage - 1}
        isDisabled={currentPage === 1}
      />

      {/* First 3 */}
      {first.map((p) => (
        <Btn key={`f-${p}`} label={p} page={p} active={p === currentPage} />
      ))}

      {/* Left dots (show whenever is gap to middle/last) */}
      {hasLeftGap && <Dot />}

      {/* Middle (only current page) */}
      {middle.map((p) => (
        <Btn key={`m-${p}`} label={p} page={p} active={p === currentPage} />
      ))}

      {/* Right dots (gap between middle and last) */}
      {hasRightGap && <Dot />}

      {/* Last 2 */}
      {last.map((p) => (
        <Btn key={`l-${p}`} label={p} page={p} active={p === currentPage} />
      ))}

      <Btn
        label={<ChevronRight className="w-4 h-4" />}
        page={currentPage + 1}
        isDisabled={currentPage === totalPages}
      />
    </nav>
  );
};

export default Pagination;
