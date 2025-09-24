import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "./views/form";
import ThankYou from "./views/thank-you";
import Leaderboard from "./views/leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
