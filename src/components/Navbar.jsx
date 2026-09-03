import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <nav className="h-20 bg-neutral-950 border-b border-neutral-800 text-white flex items-center justify-between px-8">
      {/* Logo / Brand */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white text-black rounded-lg flex items-center justify-center font-bold">
          U
        </div>

        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            User Management
          </h1>
          <p className="text-xs text-neutral-500">Dashboard</p>
        </div>
      </Link>

      {isAuthenticated && user && (
        <div className="flex items-center gap-7">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link
              to="/users"
              className="px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
            >
              Users
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/add-user"
                className="px-4 py-2 rounded-lg text-sm bg-white text-black font-medium hover:bg-neutral-200 transition"
              >
                + Add User
              </Link>
            )}
          </div>

          {/* User section */}
          <div className="flex items-center gap-3 pl-6 border-l border-neutral-800">
            <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-semibold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>

              <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-neutral-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
