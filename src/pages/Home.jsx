import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex justify-center">
        <div className="mt-45 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-5">
            User Management System
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Manage your users
            <br />
            <span className="text-neutral-500">with simplicity.</span>
          </h1>

          <p className="text-neutral-400 max-w-xl mx-auto mt-6 text-sm md:text-base leading-7">
            A simple and secure user management platform with authentication,
            protected access and user management features.
          </p>

          <div className="flex justify-center gap-4 mt-10">
            <a
              href="/signup"
              className="bg-white text-black px-6 py-3 rounded font-semibold text-sm hover:bg-neutral-200"
            >
              Create Account
            </a>

            <a
              href="/login"
              className="border border-neutral-700 px-6 py-3 rounded font-semibold text-sm hover:bg-neutral-800"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
