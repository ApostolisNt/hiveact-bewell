import { useMemo } from "react";
import hiveact from "../assets/hiveact.png";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { schema, type FormValues } from "../schema/general";
import { mockPostReaction } from "../api/general";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      rt1: undefined,
      rt2: undefined,
      rt3: undefined,
    },
  });
  const [rt1, rt2, rt3] = watch(["rt1", "rt2", "rt3"]);
  const average = useMemo(() => {
    const nums = [rt1, rt2, rt3].filter(
      (n) => Number.isFinite(n) && (n as number) > 0
    ) as number[];
    if (nums.length === 0) return 0;
    return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
  }, [rt1, rt2, rt3]);

  const onValid: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await mockPostReaction({ values, average });
      if (res.ok) {
        navigate("/thank-you", { state: { avg: average, values } });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="relative w-[95%] max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl pt-8 shadow-2xl relative z-10 pb-10 lg:pb-0">
          <h2 className="text-light-gray text-2xl font-normal mb-6 sm:mb-8 text-center">
            New Reaction Time
          </h2>

          <form onSubmit={handleSubmit(onValid)} noValidate>
            {/* Form Fields */}
            <div className="space-y-3 mb-6 px-4 sm:px-6 md:px-8">
              <div>
                <input
                  placeholder="Name"
                  className="w-full border border-border-gray text-lg font-normal bg-lighter-gray px-3 sm:px-4 py-3 rounded-3xl outline-none text-gray-700 placeholder-light-gray"
                  {...register("name")}
                />
              </div>

              <div>
                <input
                  placeholder="Age"
                  type="number"
                  inputMode="numeric"
                  className="w-full border border-border-gray text-lg font-normal bg-lighter-gray px-3 sm:px-4 py-3 rounded-3xl outline-none text-gray-700 placeholder-light-gray"
                  {...register("age", { valueAsNumber: true })}
                />
              </div>

              <div>
                <input
                  placeholder="Email Address"
                  type="email"
                  className="w-full border border-border-gray text-lg font-normal bg-lighter-gray px-3 sm:px-4 py-3 rounded-3xl outline-none text-gray-700 placeholder-light-gray"
                  {...register("email")}
                />
              </div>
            </div>

            {/* Reaction Times Section */}
            <div className="mb-6 px-4 sm:px-6 md:px-8">
              <label className="block text-light-gray text-lg sm:text-xl font-normal mb-3 sm:mb-4 text-center">
                Reaction Times
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-border-gray flex flex-col items-start bg-lighter-gray rounded-xl gap-1 p-3">
                  <div className="text-base text-light-gray font-medium">
                    Wall
                  </div>
                  <input
                    placeholder="1453ms"
                    type="number"
                    inputMode="numeric"
                    className="w-full text-2xl leading-none font-normal outline-none text-gray-700 placeholder-light-gray"
                    {...register("rt1", { valueAsNumber: true })}
                  />
                </div>

                <div className="border border-border-gray flex flex-col items-start bg-lighter-gray rounded-xl gap-1 p-3">
                  <div className="text-base text-light-gray font-medium">
                    Wall
                  </div>
                  <input
                    placeholder="1453ms"
                    type="number"
                    inputMode="numeric"
                    className="w-full text-2xl leading-none font-normal outline-none text-gray-700 placeholder-light-gray"
                    {...register("rt2", { valueAsNumber: true })}
                  />
                </div>

                <div className="border border-border-gray flex flex-col items-start bg-lighter-gray rounded-xl gap-1 p-3">
                  <div className="text-base text-light-gray font-medium">
                    Wall
                  </div>
                  <input
                    placeholder="1453ms"
                    type="number"
                    inputMode="numeric"
                    className="w-full text-2xl leading-none font-normal outline-none text-gray-700 placeholder-light-gray"
                    {...register("rt3", { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>

            {/* Average Display + Submit */}
            <div className="bg-secondary-pink rounded-4xl p-4 sm:p-5 text-center border border-primary-pink/10 z-50 mx-4 sm:mx-6 md:mx-8">
              <div className="text-lg text-primary-pink font-medium">
                Your Average
              </div>
              <div className="text-2xl sm:text-3xl leading-none font-semibold text-primary-pink">
                {average || 0}ms
              </div>

              <button
                className="w-full mt-4 bg-primary-pink text-white rounded-3xl px-5 py-3 font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                type="submit"
                disabled={!isValid || !average || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          <img
            src={hiveact}
            alt="Hiveact Logo"
            className="relative rounded-b-3xl w-full mx-auto pointer-events-none select-none z-20 hidden lg:block"
          />
        </div>
      </div>
    </main>
  );
};

export default Form;
