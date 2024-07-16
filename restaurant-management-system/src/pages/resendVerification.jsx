import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../axios/axios";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const location = useLocation();
  const { email, password } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/verifytoken", { email, password });
      toast.success("Verification email sent!");
    } catch (error) {
      toast.error("Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Verify Your Email
        </h1>
        <p className="mb-8 text-center">
          We've sent a verification email to{" "}
          <span className="font-semibold">{email}</span>. Please check your
          inbox and verify your email address.
        </p>
        <button
          className={`w-full rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "Resending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
