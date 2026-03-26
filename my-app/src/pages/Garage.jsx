import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
export default function Garage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("garage")) || [];
    setVehicles(stored);
  }, []);

  return (
    <Layout>
    <div className="min-h-screen bg-[#0B0F19] text-white p-6">
      <h1 className="text-2xl font-bold mb-2">❤️ My Garage</h1>
      <p className="text-gray-400 mb-6">
        {vehicles.length} saved vehicle
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {vehicles.map((v, i) => (
          <div
            key={v.id}
            className="bg-[#111827] rounded-xl overflow-hidden"
          >
            <img
              src={v.image}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3>{v.name}</h3>
              <p className="text-yellow-400">{v.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}