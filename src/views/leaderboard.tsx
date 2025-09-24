import React, { useEffect, useMemo, useState } from "react";
import RowItem, { type Row } from "../components/row-item";
import TableHeader from "../components/table-header";
import Pagination from "../components/pagination";

const PAGE_SIZE = 10;

// Simulate server-side fetch
async function fetchPage(
  page: number,
  pageSize: number
): Promise<{ items: Row[]; totalPages: number }> {
  // TODO: Replace with API call
  const all: Row[] = [
    { name: "Maximos Parisis", ms: 43, deltaPct: 3 },
    { name: "Marios Angelakis", ms: 54, deltaPct: 3 },
    { name: "Vasilis Georgopoulos", ms: 130, deltaPct: 3 },
    { name: "Panagiotis Dimas", ms: 3400, deltaPct: 1 },
    { name: "Giorgos Vlassopoulos", ms: 454, deltaPct: 1 },
    { name: "Olympia Papadopoulou", ms: 454, deltaPct: -2 },
    { name: "Konstantinos Georgiou", ms: 454, deltaPct: -2 },
    { name: "Giorgos Konstantinidis", ms: 454345, deltaPct: -2 },
    { name: "God", ms: 454553, deltaPct: -4 },
    { name: "Steve Jobs", ms: 4543225, deltaPct: -4 },
  ];

  const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  await new Promise((r) => setTimeout(r, 150));

  return { items: all.slice(start, end), totalPages };
}

const LeaderboardPaged: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Row[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPage(page, PAGE_SIZE)
      .then(({ items, totalPages }) => {
        if (!cancelled) {
          setRows(items);
          setTotalPages(totalPages);
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [page]);

  // Keep global rank numbers
  const startIndex = useMemo(() => (page - 1) * PAGE_SIZE, [page]);

  return (
    <div className="min-h-screen bg-primary-pink flex items-center justify-center p-2">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-white text-2xl md:text-4xl font-medium tracking-wide">
            Reaction Time Leaderboard
          </h1>
        </div>

        {/* Board */}
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl">
          <TableHeader />

          {loading && rows.length === 0 ? (
            <div className="py-10 text-center text-light-gray">Loading…</div>
          ) : (
            rows.map((row, i) => (
              <RowItem key={row.name} row={row} index={startIndex + i} />
            ))
          )}

          {/* Pagination */}
          <div className="mt-4 md:mt-6">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onChange={setPage}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPaged;
