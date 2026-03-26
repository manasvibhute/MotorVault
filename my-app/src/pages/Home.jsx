import { Heart, SlidersHorizontal } from "lucide-react";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicles")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCompare = async (v) => {
    try {
      const res = await axios.post("http://localhost:5000/api/compare", {
        vehicleId: v._id,
        name: v.name,
        price: v.price,
        image: v.image,
        category: v.category,
        fuel: v.fuel,
        year: v.year,
        power: v.power,
        topSpeed: v.topSpeed,
        zeroToSixty: v.zeroToSixty,
        transmission: v.transmission,
        drivetrain: v.drivetrain,
        seats: v.seats,
        color: v.color,
        mileage: v.mileage,
        tag: v.tag,
      });

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

      window.dispatchEvent(new Event("compareUpdated"));
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Error adding to compare";

      window.dispatchEvent(
        new CustomEvent("toast", { detail: { kind: "error", message } })
      );
    }
  };

  // 🔥 FILTER LOGIC
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      (v.brand || "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || v.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-6">

        <h2 className="text-4xl font-bold mb-2">
          Discover Your Next <span className="text-yellow-400">Machine</span>
        </h2>

        <p className="text-gray-400 mb-6">
          Showing {filteredVehicles.length} vehicles
        </p>

        {/* 🔥 SEARCH + FILTER */}
        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search make or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-800 px-4 py-3 rounded-lg outline-none"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 px-4 py-3 rounded-lg"
          >
            <option>All</option>
            <option>SUV</option>
            <option>Sedan</option>
            <option>Bike</option>
            <option>Coupe</option>
          </select>
        </div>

        {/* 🔥 CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredVehicles.map((v, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-[#0F172A] to-[#020617] p-4 rounded-2xl border border-gray-800 shadow-lg hover:scale-105 transition"
            >
              <div className="relative">
                <img
                  src={v.image}
                  alt={v.name}
                  className="h-40 w-full object-cover rounded-xl"
                />

                <span className="absolute top-3 left-3 bg-blue-500 text-xs px-3 py-1 rounded-full">
                  {v.tag || "Fair Price"}
                </span>

                <button className="absolute top-3 right-3 bg-black/60 p-2 rounded-full">
                  <Heart size={16} />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-gray-400 text-sm">
                  {v.brand || "Brand"} · {v.year || "2023"}
                </p>

                <h3 className="text-xl font-bold mt-1">{v.name}</h3>

                <p className="text-yellow-400 text-xl font-bold mt-2">
                  {v.price}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleAddToCompare(v)}
                    className="flex-1 border border-gray-600 py-2 rounded-lg text-sm"
                  >
                    + Compare
                  </button>

                  <button
                    onClick={() => navigate(`/vehicle/${v._id}`)}
                    className="flex-1 bg-yellow-500 text-black py-2 rounded-lg font-semibold"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}