import { useState } from "react";
import { updateUser } from "../services/userService";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const UserModal = ({ user, mode, onClose, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [dob, setDob] = useState(user.dob.split("T")[0]);

  async function handleUpdate() {
    const updatedUser = {
      name,
      phone,
      email,
      dob,
    };

    const { data, response } = await updateUser(user._id, updatedUser);

    if (response.ok) {
      toast.success("User updated successfully");
      onUpdate({ ...data.user, _id: data.user.id });
    } else {
      toast.error(data.message || "Failed to update user");
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            {mode === "edit" ? "Edit User" : "User Details"}
          </p>

          <h2 className="text-2xl font-bold text-white mt-1">
            {mode === "edit" ? "Update information" : user.name}
          </h2>
        </div>

        {/* Name Input - Edit Mode */}
        {mode === "edit" && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 text-white outline-none focus:border-neutral-500"
          />
        )}

        {/* User Information */}
        <div className="flex flex-col gap-3 mt-5 text-neutral-300">
          {/* Phone */}
          {mode === "edit" ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded p-3 text-white outline-none focus:border-neutral-500"
            />
          ) : (
            <p>Phone: {user.phone}</p>
          )}

          {/* Email */}
          {mode === "edit" ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded p-3 text-white outline-none focus:border-neutral-500"
            />
          ) : (
            <p>Email: {user.email}</p>
          )}

          {/* Date of Birth */}
          {mode === "edit" ? (
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded p-3 text-white outline-none focus:border-neutral-500"
            />
          ) : (
            <p>Date of Birth: {user.dob.split("T")[0]}</p>
          )}

          {/* Update Button */}
          {mode === "edit" && (
            <button
              type="button"
              onClick={handleUpdate}
              className="mt-5 bg-white text-black px-4 py-2 rounded font-medium hover:bg-neutral-200"
            >
              Update User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
