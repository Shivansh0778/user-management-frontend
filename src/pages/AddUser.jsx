import { useState } from "react";

import Navbar from "../components/Navbar";
import { createUser } from "../services/userService";
import { toast } from "react-toastify";

const AddUser = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
    setMessage("");
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
    setMessage("");
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setMessage("");
  }

  function handleDobChange(e) {
    setDob(e.target.value);
    setMessage("");
  }

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
      setMessage("DOB is required");
      return;
    }

    const user = {
      name,
      phone,
      email,
      dob,
    };

    const { response, data } = await createUser(user);

    if (response.ok) {
      setName("");
      setPhone("");
      setEmail("");
      setDob("");

      toast.success("User created successfully");
      setMessage("User created successfully");
    } else {
      setMessage(data.message || "Something went wrong");
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row text-neutral-100 font-sans p-4 md:p-10 gap-6 md:gap-10">
        {/* Left Panel */}

        <div className="hidden md:block flex-1 bg-neutral-200 p-2 rounded-lg h-180">
          <img
            className="w-full h-full object-cover rounded"
            src="https://images.unsplash.com/photo-1773332598413-a6d5279d1ae8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User management"
          />
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col justify-center bg-neutral-950 px-5 md:px-10 py-8 md:py-10 border border-neutral-800 rounded-lg">
          <div className="mt-8 md:mt-10 text-xl md:text-2xl mb-6 md:mb-10 flex items-center flex-col gap-2 text-center">
            <h2>User Registration</h2>

            <p className="text-sm text-neutral-400">
              Enter member details to save a new record to the directory.
            </p>
          </div>

          {/* Success/Error Message */}
          {message && <p className="text-sm text-yellow-300">* {message}</p>}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 md:gap-5 mt-6 md:mt-8"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">Name</label>

              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="John Doe"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="john@example.com"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                Phone
              </label>

              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="7009897832"
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white placeholder-neutral-600"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-neutral-400">
                Date of Birth
              </label>

              <input
                type="date"
                value={dob}
                onChange={handleDobChange}
                className="bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-white text-black text-sm p-3 rounded font-bold"
            >
              Save User
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
