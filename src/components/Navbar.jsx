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
    <nav className="bg-neutral-950 border-b border-neutral-800 text-white flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 py-4 gap-4">
      {/* Logo / Brand */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white text-black rounded-lg flex items-center justify-center font-bold">
          U
        </div>

        <div>
          <h1 className="text-base sm:text-lg font-semibold tracking-tight">
            User Management
          </h1>
          <p className="text-[11px] sm:text-xs text-neutral-500">Dashboard</p>
        </div>
      </Link>

      {isAuthenticated && user && (
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link
              to="/users"
              className="px-4 py-2 rounded-lg text-sm text-neutral-300 border border-neutral-800 bg-neutral-900 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition text-center"
            >
              Users
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/add-user"
                className="px-3 py-2 rounded-lg text-sm bg-white text-black font-medium hover:bg-neutral-200 transition text-center"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">+ Add User</span>
              </Link>
            )}
          </div>

          {/* User section */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0 sm:pl-6 sm:border-l sm:border-neutral-800">
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
              className="sm:ml-2 px-4 py-2 rounded-lg border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-neutral-600 transition"
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
