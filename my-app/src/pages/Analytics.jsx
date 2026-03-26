import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function Analytics() {
  const [stats, setStats] = useState({
    listings: 0,
    views: 0,
    inquiries: 0,
    avgPrice: "₹0",
  });

  const [categoryViews, setCategoryViews] = useState([]);
  const [topViewed, setTopViewed] = useState([]);

  // --- NEW: HARDCODED DATA FOR INQUIRIES ---
  const hardcodedInquiryCategories = [
    { name: "Supercar", value: 185 },
    { name: "Luxury", value: 142 },
    { name: "Sport", value: 98 },
    { name: "EV", value: 15 },
  ];

  const hardcodedMostInquired = [
    { name: "Lamborghini Revuelto", inquiries: 94 },
    { name: "Ferrari Purosangue", inquiries: 82 },
    { name: "Porsche 911 GT3 RS", inquiries: 76 },
    { name: "McLaren Artura", inquiries: 64 },
    { name: "Aston Martin Valhalla", inquiries: 58 },
  ];
  // ----------------------------------------

  const COLORS = ["#60a5fa", "#facc15", "#34d399", "#f87171"];

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics");
      const vehiclesRes = await axios.get("http://localhost:5000/api/vehicles");

      const views = res.data.views || [];
      const vehicles = vehiclesRes.data || [];

      setStats({
        listings: vehicles.length,
        views: views.length,
        inquiries: 440, // ✅ HARDCODED
        avgPrice: "₹91.1L",
      });

      // CATEGORY VIEWS
      const categoryMap = {};
      views.forEach((v) => {
        const vehicle = vehicles.find((veh) => veh._id === v.vehicleId);
        if (!vehicle) return;
        const cat = vehicle.category || "Other";
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });

      const categoryData = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
      }));

      setCategoryViews(categoryData);

      // TOP VIEWED
      const vehicleViewMap = {};
      views.forEach((v) => {
        vehicleViewMap[v.vehicleId] = (vehicleViewMap[v.vehicleId] || 0) + 1;
      });

      const top = Object.entries(vehicleViewMap)
        .map(([id, count]) => {
          const vehicle = vehicles.find((v) => v._id === id);
          return {
            name: vehicle?.name || "Unknown",
            views: count,
          };
        })
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      setTopViewed(top);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-8 tracking-wide">ANALYTICS OVERVIEW</h1>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Card title="Total Listings" value={stats.listings} icon="🚗" />
          <Card title="Total Views" value={stats.views} icon="👁️" />
          <Card title="Total Inquiries" value={stats.inquiries} icon="📩" />
          <Card title="Avg Price" value={stats.avgPrice} icon="💰" />
        </div>

        {/* ROW 1: VIEW ANALYTICS */}
        <h2 className="text-xl font-semibold mb-4 text-blue-400">View Analytics</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <ChartCard title="Views by Category">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryViews}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value">
                  {categoryViews.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Viewed Vehicles">
            <div className="space-y-3">
              {topViewed.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-800 pb-2">
                  <span>{item.name}</span>
                  <span className="text-gray-400">{item.views} views</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* ROW 2: INQUIRY ANALYTICS (HARDCODED) */}
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">Inquiry Analytics</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <ChartCard title="Inquiries by Category (Total: 440)">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hardcodedInquiryCategories}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value" fill="#facc15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Most Inquired Vehicles">
            <div className="space-y-3">
              {hardcodedMostInquired.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-800 pb-2">
                  <span>{item.name}</span>
                  <span className="text-yellow-400 font-medium">{item.inquiries} inquiries</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800 hover:border-gray-600 transition">
      <p className="text-gray-400 text-sm uppercase tracking-wider">{title}</p>
      <h2 className="text-2xl font-bold mt-2">
        <span className="mr-2">{icon}</span> {value}
      </h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800 shadow-xl">
      <h2 className="mb-6 font-semibold text-gray-300 border-l-4 border-yellow-500 pl-3">
        {title}
      </h2>
      {children}
    </div>
  );
}