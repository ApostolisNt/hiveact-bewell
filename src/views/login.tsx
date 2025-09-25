import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { loginRequest } from "../api/general";
import { setSession, isAuthenticated } from "../utils/auth";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await loginRequest({ usernameField, passwordField });
    setLoading(false);
    if (res.ok && res.data?.message === "Successful login.") {
      const { username, expireAt, jwt, message } = res.data;
      if (!username || !jwt || !expireAt) {
        setError("Invalid login response");
        return;
      }
      setSession({ username, expireAt, jwt, message });
      navigate("/", { replace: true });
    } else {
      setError(res.data?.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="w-[95%] max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <h2 className="text-light-gray text-3xl font-normal mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Username
              </label>
              <input
                className="w-full border border-border-gray placeholder:text-light-gray text-black bg-lighter-gray rounded-2xl px-4 py-3 outline-none"
                value={usernameField}
                onChange={(e) => setUsernameField(e.target.value)}
                autoComplete="username"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full border border-border-gray bg-lighter-gray placeholder:text-light-gray text-black rounded-2xl px-4 py-3 pr-12 outline-none"
                  value={passwordField}
                  onChange={(e) => setPasswordField(e.target.value)}
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPwd ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading || !usernameField || !passwordField}
              className="w-full flex items-center justify-center gap-2 bg-primary-pink text-white rounded-2xl px-5 py-3 font-semibold disabled:opacity-60 cursor-pointer"
            >
              <LogIn className="size-5" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <Link
              to="/leaderboard"
              className="w-full flex items-center justify-center gap-2 bg-secondary-pink text-primary-pink border border-primary-pink rounded-2xl px-5 py-3 font-semibold"
            >
              View Leaderboard
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
