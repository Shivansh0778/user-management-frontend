import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages//Login";
import AuthInitializer from "./components/AuthInitializer";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot-password",

      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",

      element: <ResetPassword />,
    },
    {
      path: "/add-user",
      element: (
        <ProtectedRoute>
          <AddUser />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/users",

      element: (
        <ProtectedRoute>
          <Users />,
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <>
      <AuthInitializer />
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
