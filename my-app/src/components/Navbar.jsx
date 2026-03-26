import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-full bg-[#0B0F19] border-b border-gray-800 px-6 py-4 flex justify-between items-center">

            {/* Logo */}
            <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer"
            >
                <span className="text-yellow-400 text-xl">🚗</span>
                <h1 className="text-lg font-bold text-yellow-400">
                    MotorVault
                </h1>
            </div>

            {/* Nav Links */}
            <div className="flex gap-6 items-center">

                <span
                    onClick={() => navigate("/")}
                    className={`cursor-pointer ${isActive("/") ? "text-yellow-400" : "text-gray-400"
                        }`}
                >
                    Showroom
                </span>

                <span
                    onClick={() => navigate("/garage")}
                    className={`cursor-pointer ${isActive("/garage") ? "text-yellow-400" : "text-gray-400"
                        }`}
                >
                    Garage
                </span>

                <span
                    onClick={() => navigate("/analytics")}
                    className={`cursor-pointer ${location.pathname === "/analytics"
                        ? "text-yellow-400"
                        : "text-gray-400"
                        }`}
                >
                    Analytics
                </span>

                <span
                    onClick={() => navigate("/compare")}
                    className={`cursor-pointer ${isActive("/compare") ? "text-yellow-400" : "text-gray-400"
                        }`}
                >
                    Compare
                </span>
            </div>
        </div>
    );
}