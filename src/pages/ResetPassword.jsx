import { useState } from "react";

import Navbar from "../components/Navbar";

import { resetPassword } from "../services/authService";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!otp) {
      setMessage("OTP is required");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setMessage("OTP must be exactly 6 digits");
      return;
    }

    if (!password) {
      setMessage("Password is required");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (!confirmPassword) {
      setMessage("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const resetData = {
      otp,
      password,
    };

    const { response, data } = await resetPassword(resetData);

    if (response.ok) {
      toast.success("Password reset successfully");

      setOtp("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } else {
      toast.error(data.message);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-lg p-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3">
              Password Recovery
            </p>

            <h1 className="text-3xl font-bold">Reset your password</h1>

            <p className="text-sm text-neutral-500 mt-2">
              Enter the 6-digit OTP sent to your email and create a new
              password.
            </p>
          </div>

          {message && <p className="text-sm text-red-400 mb-4">* {message}</p>}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* OTP */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">OTP</label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                  setMessage("");
                }}
                placeholder="Enter 6-digit OTP"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  placeholder="Enter new password"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 pr-10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setMessage("");
                  }}
                  placeholder="Confirm new password"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 pr-10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              className="mt-2 bg-white text-black p-3 rounded font-bold text-sm hover:bg-neutral-200"
            >
              Reset Password
            </button>
          </form>

          <p className="text-sm text-neutral-500 text-center mt-6">
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-white hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
