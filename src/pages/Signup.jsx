import { useState } from "react";
import Navbar from "../components/Navbar";
import { signup } from "../services/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setMessage("Name is required");
      return;
    }

    if (!phone) {
      setMessage("Phone is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("Phone must be exactly 10 digits");
      return;
    }

    if (!email) {
      setMessage("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    if (!dob) {
      setMessage("Date of birth is required");
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
      name,
      phone,
      email,
      dob,
      password,
    };

    const { response, data } = await signup(user);

    if (response.ok) {
      localStorage.setItem("token", data.token);

      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        }),
      );

      toast.success("Account created successfully");

      navigate("/users");

      setName("");
      setPhone("");
      setEmail("");
      setDob("");
      setPassword("");
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
              Get Started
            </p>

            <h1 className="text-3xl font-bold">Create your account</h1>

            <p className="text-sm text-neutral-500 mt-2">
              Enter your details to create a new account.
            </p>
          </div>

          {message && <p className="text-sm text-red-400 mb-4">* {message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setMessage("");
                }}
                placeholder="John Doe"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                Phone
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setMessage("");
                }}
                placeholder="7009897832"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

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
                Date of Birth
              </label>

              <input
                type="date"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setMessage("");
                }}
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter your password"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-white text-black p-3 rounded font-bold text-sm hover:bg-neutral-200"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-neutral-500 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-white hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
