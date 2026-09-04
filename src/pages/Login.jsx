import Navbar from "../components/Navbar";
import { useState } from "react";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

    if (!password) {
      setMessage("Password is required");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    const user = {
      email,
      password,
    };

    const { response, data } = await login(user);

    if (response.ok) {
      localStorage.setItem("token", data.token);

      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        }),
      );
      navigate("/users");
      console.log("Token saved successfully");
    } else {
      setMessage(data.message);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-neutral-900 text-neutral-100">
        <Navbar />

        <div className="flex items-start justify-center px-4 pt-6 pb-10 md:px-6 md:pt-8 md:pb-10">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-lg p-5 md:p-8">
            <div className="mb-6 md:mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3">
                Welcome Back
              </p>

              <h1 className="text-2xl md:text-3xl font-bold">
                Login to your account
              </h1>

              <p className="text-sm text-neutral-500 mt-2">
                Enter your email and password to continue.
              </p>
            </div>
            {message && (
              <p className="text-sm text-red-400 mb-4">* {message}</p>
            )}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4 md:gap-5"
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
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-neutral-400">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-neutral-400 hover:text-white"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="mt-2 bg-white text-black p-3 rounded font-bold text-sm hover:bg-neutral-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
