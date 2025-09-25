import React, { useEffect, useMemo, useState, useContext } from "react";
import RowItem from "../components/row-item";
import TableHeader from "../components/table-header";
import Pagination from "../components/pagination";
import {
  type LeaderboardItem,
  type LeaderboardResponse,
  getLeaderboard,
} from "../api/general";
import LeaderboardRefreshContext from "../context/leaderboardRefreshContext";

const PAGE_SIZE = 10;

const LeaderboardPaged: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<LeaderboardItem[]>([]);
  const [overallAverage, setOverallAverage] = useState<number>(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const refreshVersion = useContext(LeaderboardRefreshContext)?.version ?? 0;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data: LeaderboardResponse = await getLeaderboard(
          page,
          PAGE_SIZE,
          {
            cache: "no-store",
          }
        );
        if (cancelled) return;

        setRows(data.items);
        setOverallAverage(data.overallAverage);
        setTotalPages(data.totalPages);
        setTotalPlayers(data.count);
      } catch (e: unknown) {
        if (!cancelled)
          console.log((e as Error)?.message || e?.toString() || "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, refreshVersion]);

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
          <TableHeader overallAverage={overallAverage} />

          {loading && rows.length === 0 ? (
            <div className="py-10 text-center text-light-gray">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="py-10 text-center text-light-gray">No results.</div>
          ) : (
            rows.map((row, i) => (
              <RowItem
                key={`${row.name}-${startIndex + i}`}
                row={row}
                index={startIndex + i}
              />
            ))
          )}

          {/* Pagination */}
          <div className="mt-4 md:mt-6">
            <Pagination
              totalPages={totalPages}
              totalPlayers={totalPlayers}
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
