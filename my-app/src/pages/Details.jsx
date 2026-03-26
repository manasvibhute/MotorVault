import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Details() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const [inquiryForm, setInquiryForm] = useState({ userName: "", email: "", message: "" });

    useEffect(() => {
        if (!vehicle) return;

        axios.get("http://localhost:5000/api/compare")
            .then(res => {
                const exists = res.data.find(v => v.vehicleId === vehicle._id);
                setIsCompared(!!exists);
            });
    }, [vehicle]);

    const handleCompare = async () => {
        try {
            if (isCompared) {
                // ❌ remove
                await axios.delete(`http://localhost:5000/api/compare/${vehicle._id}`);
                setIsCompared(false);
                window.dispatchEvent(
                    new CustomEvent("toast", {
                        detail: { kind: "info", message: "Removed from comparison" },
                    })
                );
            } else {
                const res = await axios.post("http://localhost:5000/api/compare", {
                    vehicleId: vehicle._id,
                    name: vehicle.name,
                    price: vehicle.price,
                    image: vehicle.image,
                    category: vehicle.category,
                    fuel: vehicle.fuel,
                    year: vehicle.year,
                    power: vehicle.power,
                    topSpeed: vehicle.topSpeed,
                    zeroToSixty: vehicle.zeroToSixty,
                    transmission: vehicle.transmission,
                    drivetrain: vehicle.drivetrain,
                    seats: vehicle.seats,
                    color: vehicle.color,
                    mileage: vehicle.mileage,
                    tag: vehicle.tag,
                });

                setIsCompared(true);

                const count = res?.data?.count;
                const n = typeof count === "number" ? count : 1;
                window.dispatchEvent(
                    new CustomEvent("toast", {
                        detail: {
                            kind: "success",
                            message: `${n} vehicle${n === 1 ? "" : "s"} added for comparison (${n}/3)`,
                        },
                    })
                );
            }

            window.dispatchEvent(new Event("compareUpdated"));

        } catch (err) {
            const message = err?.response?.data?.message || "Error updating compare";
            window.dispatchEvent(
                new CustomEvent("toast", { detail: { kind: "error", message } })
            );
        }
    };
    const handleInquiry = async () => {
        try {
            await axios.post("http://localhost:5000/api/inquiry", {
                vehicleId: vehicle._id,
                name: vehicle.name,
                category: vehicle.category,
                userName: inquiryForm.userName,     // ← ADD
                email: inquiryForm.email,           // ← ADD
                message: inquiryForm.message,       // ← ADD
            });

            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: { kind: "success", message: "Inquiry sent!" },
                })
            );
            setInquiryForm({ userName: "", email: "", message: "" }); // reset form
            navigate("/analytics");

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log("ID:", id);

        // 🔥 TRACK VIEW
        axios.post("http://localhost:5000/api/analytics/view", {
            vehicleId: id,
            timestamp: new Date()
        });

        let cancelled = false;
        setLoading(true);
        setError(null);
        setVehicle(null);

        axios
            .get(`http://localhost:5000/api/vehicles/${id}`)
            .then((res) => {
                if (!cancelled) setVehicle(res.data);
            })
            .catch((err) => {
                if (cancelled) return;
                const message =
                    err?.response?.data?.message ||
                    err?.response?.statusText ||
                    err?.message ||
                    "Failed to load vehicle";
                setError(message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);
    
    useEffect(() => {
        if (!vehicle) return;

        const garage = JSON.parse(localStorage.getItem("garage")) || [];
        const exists = garage.find((v) => v.id === vehicle._id);

        setIsSaved(!!exists);
    }, [vehicle]);

    if (loading) {
        return <div className="text-white p-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-white p-10">{error}</div>;
    }

    if (!vehicle) {
        return <div className="text-white p-10">Vehicle not found</div>;
    }

    const handleSave = () => {
        const garage = JSON.parse(localStorage.getItem("garage")) || [];

        const exists = garage.find((v) => v.id === vehicle._id);

        // Toggle in/out of garage
        if (exists) {
            const next = garage.filter((v) => v.id !== vehicle._id);
            localStorage.setItem("garage", JSON.stringify(next));
            setIsSaved(false);
        } else {
            garage.push({
                id: vehicle._id,
                name: vehicle.name,
                price: vehicle.price,
                image: vehicle.image,
            });

            localStorage.setItem("garage", JSON.stringify(garage));
            setIsSaved(true);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-6">
                <div className="grid md:grid-cols-2 gap-10">

                    {/* LEFT */}
                    <div>
                        <img
                            src={vehicle.image}
                            className="rounded-xl w-full h-[400px] object-cover"
                        />
                    </div>

                    {/* RIGHT */}
                    <div>
                        <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">
                            {vehicle.category}
                        </span>

                        <h1 className="text-3xl font-bold mt-3">
                            {vehicle.name}
                        </h1>

                        <p className="text-yellow-400 text-2xl font-bold mt-2">
                            {vehicle.price}
                        </p>

                        <p className="text-gray-400 mt-2">
                            {vehicle.category} vehicle
                        </p>

                        {/* Buttons */}
                        {/* Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleSave}
                                className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition ${isSaved
                                    ? "bg-green-600 text-white"
                                    : "bg-[#1F2937] hover:bg-[#374151]"
                                    }`}
                            >
                                {isSaved ? "✔ Saved" : "❤️ Save to Garage"}
                            </button>

                            <button
                                onClick={handleCompare}
                                className={`flex-1 py-3 rounded-lg font-semibold transition ${isCompared
                                    ? "bg-green-600 text-white"
                                    : "bg-yellow-500 text-black"
                                    }`}
                            >
                                {isCompared ? "✔ Added" : "Compare"}
                            </button>
                        </div>

                        {/* INFO GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                            <div className="bg-[#111827] p-4 rounded-xl">
                                <p className="text-gray-400 text-sm">Fuel</p>
                                <p className="font-semibold">{vehicle.fuel || "EV"}</p>
                            </div>

                            <div className="bg-[#111827] p-4 rounded-xl">
                                <p className="text-gray-400 text-sm">Power</p>
                                <p className="font-semibold">{vehicle.power || "105 HP"}</p>
                            </div>

                            <div className="bg-[#111827] p-4 rounded-xl">
                                <p className="text-gray-400 text-sm">Top Speed</p>
                                <p className="font-semibold">{vehicle.topSpeed || "110 mph"}</p>
                            </div>

                            <div className="bg-[#111827] p-4 rounded-xl">
                                <p className="text-gray-400 text-sm">Transmission</p>
                                <p className="font-semibold">{vehicle.transmission || "Automatic"}</p>
                            </div>

                            <div className="bg-[#111827] p-4 rounded-xl">
                                <p className="text-gray-400 text-sm">Seats</p>
                                <p className="font-semibold">{vehicle.seats || "1"}</p>
                            </div>

                            <div className="bg-[#111827] p-4 rounded-xl">
                                <p className="text-gray-400 text-sm">Color</p>
                                <p className="font-semibold">{vehicle.color || "Liquid Orange"}</p>
                            </div>

                        </div>

                        {/* EXTRA TEXT */}
                        <p className="text-gray-400 mt-6">
                            {vehicle.description || "3.0s 0-60 · Belt drivetrain"}
                        </p>

                        {/* Inquiry */}
                        <div className="bg-[#111827] p-6 rounded-xl mt-8">
                            <h2 className="mb-4 font-semibold">Inquire Now</h2>

                            <input
                                className="w-full mb-3 p-3 rounded bg-gray-800"
                                placeholder="Your Name"
                                value={inquiryForm.userName}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, userName: e.target.value })}
                            />
                            <input
                                className="w-full mb-3 p-3 rounded bg-gray-800"
                                placeholder="Email Address"
                                value={inquiryForm.email}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                            />
                            <textarea
                                className="w-full mb-3 p-3 rounded bg-gray-800"
                                placeholder="Your message"
                                value={inquiryForm.message}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                            />

                            <button
                                onClick={handleInquiry}
                                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold"
                            >
                                Send Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}