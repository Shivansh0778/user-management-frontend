import { useState } from "react";

import Navbar from "../components/Navbar";

import { forgotPassword } from "../services/authService";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    const { response, data } = await forgotPassword(email);

    if (response.ok) {
      toast.success("OTP sent to your email");

      navigate("/reset-password");
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

            <h1 className="text-3xl font-bold">
              Forgot your password?
            </h1>

            <p className="text-sm text-neutral-500 mt-2">
              Enter your email and we'll send you a 6-digit OTP to reset your
              password.
            </p>
          </div>

          {message && (
            <p className="text-sm text-red-400 mb-4">
              * {message}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                placeholder="john@example.com"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-white text-black p-3 rounded font-bold text-sm hover:bg-neutral-200"
            >
              Send OTP
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

export default ForgotPassword;