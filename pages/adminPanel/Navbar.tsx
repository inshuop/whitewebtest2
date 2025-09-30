import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

   // Debugging the session

  return (
    <nav className="bg-primary text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <Link href="/admin" className="hover:text-blue-800 transition-colors duration-300">
            White Aluminium Enterprises
          </Link>
        </div>

        {/* Navigation and User Actions */}
        <div className="flex items-center">
          {session ? (
            <>
              {/* User Greeting */}
              <span className="hidden sm:block mr-4 font-medium">
                Hello, {session.user?.name}
              </span>

              {/* Create User Button (Visible only for admin role) */}
              
                <Link href="/admin/createUser">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-4 transition-all duration-300">
                    Create User
                  </button>
                </Link>
             

              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/admin/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
