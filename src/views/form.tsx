import React, { useMemo } from "react";
import hiveact from "../assets/hiveact.png";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  age: string;
  email: string;
  rt1: string;
  rt2: string;
  rt3: string;
};

const Form = () => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState<FormValues>({
    name: "",
    age: "",
    email: "",
    rt1: "",
    rt2: "",
    rt3: "",
  });

  const [errors, setErrors] = React.useState<Partial<FormValues>>({});

  const handleInputChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onSubmit = () => {
    // Basic validation
    const newErrors: Partial<FormValues> = {};
    if (!values.name.trim()) newErrors.name = "Name is required";
    if (!values.age.trim()) newErrors.age = "Age is required";
    if (!values.email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", { values, average });
      navigate("/thank-you", { state: { avg: average, values } });
    }
  };

  const average = useMemo(() => {
    const n1 = Number(values.rt1 ?? 0);
    const n2 = Number(values.rt2 ?? 0);
    const n3 = Number(values.rt3 ?? 0);
    const nums = [n1, n2, n3].filter((n) => Number.isFinite(n) && n > 0);
    if (nums.length === 0) return 0;
    return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
  }, [values.rt1, values.rt2, values.rt3]);

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="relative lg:w-full w-[95%] max-w-2xl mx-auto">
        <div className="w-2xl bg-white rounded-3xl pt-8 shadow-2xl relative z-10 pb-10 lg:pb-0">
          {/* Header */}
          <h2 className="text-light-gray text-2xl font-normal mb-8 text-center">
            New Reaction Time
          </h2>

          {/* Form Fields */}
          <div className="space-y-2 mb-6 px-8">
            <div>
              <input
                placeholder="Name"
                className="w-full border border-[#E5EBFF] text-lg font-normal bg-lighter-gray px-4 py-3 rounded-3xl outline-none text-gray-700 placeholder-light-gray"
                value={values.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-primary-pink text-xs mt-2">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                placeholder="Age"
                inputMode="numeric"
                className="w-full border border-[#E5EBFF] text-lg font-normal bg-lighter-gray px-4 py-3 rounded-3xl outline-none text-gray-700 placeholder-light-gray"
                value={values.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
              {errors.age && (
                <p className="text-primary-pink text-xs mt-2">{errors.age}</p>
              )}
            </div>

            <div>
              <input
                placeholder="Email Address"
                type="email"
                className="w-full border border-[#E5EBFF] text-lg font-normal bg-lighter-gray px-4 py-3 rounded-3xl outline-none text-gray-700 placeholder-light-gray"
                value={values.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-primary-pink text-xs mt-2">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Reaction Times Section */}
          <div className="mb-6 px-8">
            <label className="block text-light-gray text-xl font-normal mb-4 text-center">
              Reaction Times
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-[#E5EBFF] flex flex-col items-start bg-lighter-gray rounded-xl gap-1 p-3">
                <div className="text-base text-light-gray font-medium">
                  Wall
                </div>
                <input
                  placeholder="1453ms"
                  inputMode="numeric"
                  className="w-full text-2xl/none font-normal outline-none text-gray-700 placeholder-light-gray"
                  value={values.rt1}
                  onChange={(e) => handleInputChange("rt1", e.target.value)}
                />
                {errors.rt1 && (
                  <p className="text-primary-pink text-xs mt-1">{errors.rt1}</p>
                )}
              </div>

              <div className="border border-[#E5EBFF] flex flex-col items-start bg-lighter-gray rounded-xl gap-1 p-3">
                <div className="text-base text-light-gray font-medium">
                  Wall
                </div>
                <input
                  placeholder="1453ms"
                  inputMode="numeric"
                  className="w-full text-2xl/none font-normal outline-none text-gray-700 placeholder-light-gray"
                  value={values.rt2}
                  onChange={(e) => handleInputChange("rt2", e.target.value)}
                />
                {errors.rt2 && (
                  <p className="text-primary-pink text-xs mt-1">{errors.rt2}</p>
                )}
              </div>

              <div className="border border-[#E5EBFF] flex flex-col items-start bg-lighter-gray rounded-xl gap-1 p-3">
                <div className="text-base text-light-gray font-medium">
                  Wall
                </div>
                <input
                  placeholder="1453ms"
                  inputMode="numeric"
                  className="w-full text-2xl/none font-normal outline-none text-gray-700 placeholder-light-gray"
                  value={values.rt3}
                  onChange={(e) => handleInputChange("rt3", e.target.value)}
                />
                {errors.rt3 && (
                  <p className="text-primary-pink text-xs mt-1">{errors.rt3}</p>
                )}
              </div>
            </div>
          </div>

          {/* Average Display */}
          <div className="lg:-mb-4 bg-secondary-pink rounded-4xl p-5 text-center border border-primary-pink/10 z-50 mx-8">
            <div className="text-lg text-primary-pink font-medium">
              Your Average
            </div>
            <div className="text-3xl/none font-semibold text-primary-pink">
              {average || 0}ms
            </div>

            {/* Submit Button */}
            <button
              className="w-full mt-4 bg-primary-pink text-white rounded-3xl px-5 py-3 font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
              type="button"
              disabled={
                !average || !values.name || !values.age || !values.email
              }
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <img
            src={hiveact}
            alt="Hiveact Logo"
            className="relative w-full mx-auto pointer-events-none select-none z-20 hidden lg:block"
          />
        </div>
      </div>
    </main>
  );
};

export default Form;
