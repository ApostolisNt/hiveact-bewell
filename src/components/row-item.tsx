import { memo } from "react";
import { splitName, cx, fmtMs, fmtDelta } from "../utils/general";

export type Row = { name: string; ms: number; deltaPct: number };
type RowItemProps = { row: Row; index: number };

const RowItem = memo(({ row, index }: RowItemProps) => {
  const isTopThree = index < 3;
  const emphasis = isTopThree
    ? "text-primary-pink font-bold"
    : "text-black font-semibold";
  const { first, rest } = splitName(row.name);

  return (
    <div
      key={row.name}
      className="grid grid-cols-[48px_1fr_auto] md:grid-cols-[80px_1fr_190px_140px] gap-3 md:gap-4 items-center py-3 md:py-4 px-3 md:px-2 rounded-xl mb-2 bg-secondary-pink"
    >
      {/* Rank */}
      <div className="flex items-center justify-center">
        <span
          className={cx(
            "text-xl md:text-2xl font-bold",
            isTopThree ? "text-primary-pink" : "text-black"
          )}
        >
          {index + 1}
        </span>
      </div>

      {/* Player Name */}
      <div className="flex flex-col">
        {/* Mobile: two lines */}
        <div className="flex flex-col lg:hidden">
          <span className={cx(emphasis, "leading-tight text-base md:text-xl")}>
            {first}
          </span>
          {rest && (
            <span
              className={cx(emphasis, "leading-tight text-base md:text-xl")}
            >
              {rest}
            </span>
          )}
        </div>
        {/* Desktop: single line */}
        <div className="hidden lg:block">
          <span className={cx(emphasis, "text-xl")}>{row.name}</span>
        </div>
      </div>

      {/* Reaction Time */}
      <div className="flex flex-col items-end md:items-start">
        <span className={cx(emphasis, "text-base md:text-xl")}>
          {fmtMs(row.ms)}
        </span>
        {/* Delta (mobile) */}
        <span
          className={cx(
            "md:hidden mt-1 text-sm",
            isTopThree ? "text-primary-pink font-bold" : "text-black font-bold"
          )}
        >
          {fmtDelta(row.deltaPct)}
        </span>
      </div>

      {/* Delta (desktop) */}
      <div className="hidden md:flex items-center">
        <span className={cx(emphasis, "text-xl")}>
          {fmtDelta(row.deltaPct)}
        </span>
      </div>
    </div>
  );
});

export default RowItem;