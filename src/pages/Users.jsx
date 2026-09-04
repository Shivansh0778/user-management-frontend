import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import Navbar from "../components/Navbar";
import { getUsers } from "../services/getUsers";
import UserModal from "../components/UserModal";
import { deleteUser as deleteUserApi } from "../services/userService";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await getUsers();

      setUsers(data);
    }

    fetchUsers();
  }, []);

  function handleUpdate(updateUser) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user._id === updateUser._id ? updateUser : user,
      ),
    );

    setSelectedUser(null);
    setModalMode(null);
  }

  async function handleDelete() {
    const { response, data } = await deleteUserApi(deleteUser._id);

    if (response.ok) {
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== deleteUser._id),
      );

      setDeleteUser(null);

      toast.success("User deleted successfully");
    } else {
      toast.error(data.message || "Failed to delete user");
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-neutral-100 text-neutral-900 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          {/* Page Header */}
          <div className="flex flex-col gap-5 mb-8 md:flex-row md:items-end md:justify-between md:mb-10">
            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500">
                User Management
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-1 md:mt-2 text-neutral-900">
                Users
              </h1>

              <p className="text-sm md:text-base text-neutral-500 mt-1 md:mt-2">
                Manage all registered users from one place.
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-white border border-neutral-200 rounded-xl px-4 py-3 md:px-6 md:py-4 shadow-sm w-fit">
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500">
                Total Users
              </p>

              <p className="text-xl md:text-2xl font-bold mt-1 text-neutral-900">
                {users.length}
              </p>
            </div>
          </div>

          {/* Users */}
          <UserList
            users={users}
            onView={(user) => {
              setSelectedUser(user);
              setModalMode("view");
            }}
            onEdit={(user) => {
              setSelectedUser(user);
              setModalMode("edit");
            }}
            onDelete={(user) => {
              setDeleteUser(user);
            }}
          />

          {/* View / Edit Modal */}
          {selectedUser && (
            <UserModal
              user={selectedUser}
              mode={modalMode}
              onClose={() => {
                setSelectedUser(null);
                setModalMode(null);
              }}
              onUpdate={handleUpdate}
            />
          )}

          {/* Delete Confirmation */}
          {deleteUser && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-white border border-neutral-200 rounded-xl p-6 w-96 z-50 shadow-xl">
              <h2 className="text-xl font-semibold text-neutral-900">
                Delete User
              </h2>

              <p className="text-neutral-500 mt-3">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-neutral-800">
                  {deleteUser.name}
                </span>
                ?
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeleteUser(null)}
                  className="flex-1 border border-neutral-300 px-4 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
