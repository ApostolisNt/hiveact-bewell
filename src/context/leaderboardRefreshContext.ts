import { createContext } from "react";

export type LeaderboardRefreshContextValue = {
  version: number;
  refresh: () => void;
};

const LeaderboardRefreshContext = createContext<LeaderboardRefreshContextValue | undefined>(undefined);
export default LeaderboardRefreshContext;
