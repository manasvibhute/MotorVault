import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompareBar() {
    const navigate = useNavigate();
    const [compare, setCompare] = useState([]);

    useEffect(() => {
        const load = () => {
            axios
                .get("http://localhost:5000/api/compare")
                .then((res) => setCompare(res.data || []))
                .catch(() => setCompare([]));
        };

        load();

        window.addEventListener("compareUpdated", load);

        return () => {
            window.removeEventListener("compareUpdated", load);
        };
    }, []);

    if (compare.length === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111827] border border-yellow-500 px-6 py-4 rounded-xl flex items-center gap-6 shadow-lg">

            <span className="text-yellow-400 font-semibold">
                {compare.length}/3 selected
            </span>

            <button
                onClick={() => navigate("/compare")}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold"
            >
                Compare Now →
            </button>
        </div>
    );
}