import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Form from "./views/form";
import ThankYou from "./views/thank-you";
import Leaderboard from "./views/leaderboard";
import Login from "./views/login";
import { isAuthenticated } from "./utils/auth";
import { LeaderboardRefreshProvider } from "./context/refresh";

function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

function PublicLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <LeaderboardRefreshProvider>
      <BrowserRouter>
        <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Form />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/leaderboard" replace />} />
        </Routes>
      </BrowserRouter>
    </LeaderboardRefreshProvider>
  );
}

export default App;
