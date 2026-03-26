import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Compare() {
  const [compare, setCompare] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch compare items + resolve vehicle details
  const loadAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/compare");
      const items = res.data || [];

      const resolved = await Promise.all(
        items.map(async (c) => {
          try {
            const vRes = await axios.get(
              `http://localhost:5000/api/vehicles/${c.vehicleId}`
            );
            // Merge compare doc (keep its _id) with vehicle details
            return { ...vRes.data, ...c, _id: c._id };
          } catch {
            return c;
          }
        })
      );

      setCompare(resolved);
    } catch (err) {
      console.log(err);
      setCompare([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  
    const handleUpdate = () => loadAll();
    window.addEventListener("compareUpdated", handleUpdate);
  
    return () => {
      window.removeEventListener("compareUpdated", handleUpdate);
    };
  }, []);

  // ❌ remove one
  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/api/compare/${id}`)
      .then(() => {
        window.dispatchEvent(new Event("compareUpdated"));
        loadAll();
      });
  };

  // ❌ clear all
  const handleClear = () => {
    axios.delete("http://localhost:5000/api/compare")
      .then(() => {
        window.dispatchEvent(new Event("compareUpdated"));
        loadAll();
      });
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-20 text-gray-400">Loading...</div>
      </Layout>
    );
  }

  if (compare.length === 0) {
    return (
      <Layout>
        <div className="text-center mt-20 text-gray-400">
          No vehicles selected for comparison
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Compare Vehicles</h1>

      {/* HEADER */}
      <div
        className="grid gap-6 mb-6"
        style={{
          gridTemplateColumns: `200px repeat(${compare.length}, minmax(0, 1fr))`,
        }}
      >
        <div></div>

        {compare.map((c) => (
          <div key={c._id} className="bg-[#111827] p-4 rounded-xl relative">

            <button
              onClick={() => handleRemove(c._id)}
              className="absolute top-2 right-2 bg-gray-700 rounded-full w-6 h-6 text-sm"
            >
              ✕
            </button>

            <img
              src={c.image}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold text-sm">{c.name}</h3>
            {c.tag ? (
              <div className="mt-2 text-xs text-green-400">{c.tag}</div>
            ) : null}
          </div>
        ))}
      </div>

      {/* ROWS */}
      {renderRow("Price", compare.map((v) => v.price), compare.length)}
      {renderRow("Year", compare.map((v) => v.year || "2024"), compare.length)}
      {renderRow(
        "Category",
        compare.map((v) => v.category || "Motorcycle"),
        compare.length
      )}
      {renderRow(
        "Fuel",
        compare.map((v) => v.fuel || "Petrol"),
        compare.length
      )}
      {renderRow(
        "Horsepower",
        compare.map((v) => v.power || "105 HP"),
        compare.length
      )}
      {renderRow(
        "Top Speed",
        compare.map((v) => v.topSpeed || "110 mph"),
        compare.length
      )}
      {renderRow(
        "0-60",
        compare.map((v) => v.zeroToSixty || "3.0s 0-60"),
        compare.length
      )}
      {renderRow(
        "Transmission",
        compare.map((v) => v.transmission || "Automatic"),
        compare.length
      )}
      {renderRow(
        "Drivetrain",
        compare.map((v) => v.drivetrain || "Belt"),
        compare.length
      )}
      {renderRow(
        "Seats",
        compare.map((v) => v.seats || "1"),
        compare.length
      )}
      {renderRow(
        "Color",
        compare.map((v) => v.color || "Liquid Orange"),
        compare.length
      )}
      {renderRow(
        "Mileage",
        compare.map((v) => v.mileage || "900 mi"),
        compare.length
      )}

      <div className="mt-8">
        <button
          onClick={handleClear}
          className="text-red-400 hover:text-red-300"
        >
          Clear All
        </button>
      </div>
    </Layout>
  );
}

function renderRow(label, values, count) {
  return (
    <div
      className="grid gap-6 border-t border-gray-800 py-4"
      style={{
        gridTemplateColumns: `200px repeat(${count}, minmax(0, 1fr))`,
      }}
    >
      <div className="text-gray-400">{label}</div>

      {values.map((val, i) => (
        <div key={i}>{val}</div>
      ))}
    </div>
  );
}