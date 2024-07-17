import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";

const OTPForm = ({ email, onSubmit }) => {
  const [otpInputs, setOTPInputs] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (index > 0) {
        const newInputs = [...otpInputs];
        newInputs[index - 1] = "";
        setOTPInputs(newInputs);
      }
    }
  };

  const handleInput = (e, index) => {
    const { value } = e.target;
    const newInputs = [...otpInputs];
    newInputs[index] = value;

    if (value && index < otpInputs.length - 1) {
      setOTPInputs(newInputs);
      if (index < otpInputs.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else {
      setOTPInputs(newInputs);
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const otpCode = otpInputs.join("");
      const response = await axiosInstance.post("/reservation/verify", {
        otpCode,
        email,
      });
      const successMessage =
        response.data.message || "Reservation confirmed successfully.";
      toast.success(successMessage);
      setOTPInputs(["", "", "", "", ""]);
      onSubmit(); // Notify parent component about successful OTP verification
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to confirm Reservation";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/reservation/otp", { email });
      const successMessage = response.data.message || "OTP sent again";
      toast.success(successMessage);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to resend OTP";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6">
      <div className="flex justify-center">
        <div className="mx-auto max-w-md rounded-xl bg-white px-4 py-10 text-center shadow sm:px-8">
          <header className="mb-8">
            <h1 className="mb-1 text-2xl font-bold">
              Reservation Verification
            </h1>
            <p className="text-[15px] text-slate-500">
              Enter the 5-digit verification code that was sent to your email.
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-3">
              {otpInputs.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={value}
                  maxLength="1"
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={handleFocus}
                  className="h-14 w-14 appearance-none rounded border border-transparent bg-slate-100 p-4 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              ))}
            </div>
            <div className="mx-auto mt-4 flex max-w-[260px] gap-2">
              <button
                className={`w-full rounded-lg py-3 font-semibold text-white transition-colors ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-slate-500">
            Didn't receive code?{" "}
            <button
              onClick={handleResendOTP}
              className={`font-medium text-indigo-500 hover:text-indigo-600 ${
                loading ? "cursor-not-allowed text-gray-400" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resending..." : "Resend"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
