import { Eye, Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const UserCard = ({ user, onView, onEdit, onDelete }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const isAdmin = loggedInUser?.role === "admin";

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition w-80">
      {/* User Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-lg font-semibold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 truncate">
            {user.name}
          </h3>

          <p className="text-sm text-neutral-600">{user.role}</p>
        </div>
      </div>

      {/* User Information */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Email
          </p>

          <p className="text-sm text-neutral-900 truncate mt-1">{user.email}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Phone
          </p>

          <p className="text-sm text-neutral-900 mt-1">{user.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-6 pt-4 border-t border-neutral-200">
        {/* View */}
        <button
          type="button"
          onClick={() => onView(user)}
          title="View user"
          className="flex-1 inline-flex items-center justify-center border border-neutral-300 rounded-lg p-2.5 text-neutral-800 hover:bg-neutral-100 hover:text-black transition"
        >
          <Eye size={18} />
        </button>

        {/* Edit */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => onEdit(user)}
            title="Edit user"
            className="flex-1 inline-flex items-center justify-center border border-neutral-300 rounded-lg p-2.5 text-neutral-800 hover:bg-neutral-100 hover:text-black transition"
          >
            <Pencil size={18} />
          </button>
        )}

        {/* Delete */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => onDelete(user)}
            title="Delete user"
            className="flex-1 inline-flex items-center justify-center border border-neutral-300 rounded-lg p-2.5 text-neutral-800 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
