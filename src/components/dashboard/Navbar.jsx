// Navbar.jsx
import { useAuth } from "../../context/authContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-teal-600 to-teal-500 shadow-md text-white">
            {/* Left: User greeting */}
            <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <p className="font-medium text-white text-sm sm:text-base">Welcome, {user?.name}</p>
            </div>

            {/* Right: Logout button */}
            <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Navbar;
