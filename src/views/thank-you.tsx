import { useLocation, useNavigate, Link } from "react-router-dom";
import hiveact from "../assets/hiveact.png";
import { useEffect } from "react";
import { CircleCheck } from "lucide-react";

type State = { avg?: number };

const ThankYou = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { avg } = (state as State) || {};

  useEffect(() => {
    if (avg === undefined || avg === null) {
      navigate("/");
    }
  }, [avg, navigate]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center py-6">
      <div className="relative w-[95%] max-w-xl mx-auto">
        <div className="bg-white rounded-3xl pt-8 shadow-2xl relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-light-gray text-5xl font-normal">
              Thank You!
            </h2>
            <p className="text-light-gray text-lg font-normal text-center">
              Your Reaction Time <br /> was submitted.
            </p>
          </div>

          <div className="mx-4 sm:mx-8 mt-10 sm:mt-20">
            <div className="bg-secondary-pink rounded-4xl p-5 text-center border border-primary-pink/10">
              <div className="text-lg text-primary-pink font-medium">
                Your Average
              </div>
              <div className="text-3xl leading-none font-semibold text-primary-pink">
                {avg}ms
              </div>

              {/* Submit Button */}
              <button
                className="w-full flex justify-center items-center gap-1 mt-4 bg-white text-primary-pink rounded-3xl px-5 py-3 font-semibold text-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                type="button"
              >
                Submitted
                <CircleCheck className="size-6 fill-primary-pink text-white" />
              </button>
            </div>
            <Link
              className="w-full flex justify-center items-center gap-1 mt-2 bg-secondary-pink text-primary-pink rounded-3xl px-5 py-3 font-semibold text-lg hover:shadow-md transition-all duration-200 cursor-pointer"
              to="/leaderboard"
            >
              View Leaderboard
            </Link>

            <div className="mt-16 sm:mt-28 pb-10 lg:pb-0">
              <button
                className="w-full flex justify-center items-center gap-1 mt-2 bg-primary-pink text-white rounded-3xl px-5 py-3 font-semibold text-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Submit New
              </button>
              <img
                src={hiveact}
                alt="Hiveact Logo"
                className="relative w-full mx-auto pointer-events-none select-none z-20 hidden lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
