import Navbar from "./Navbar";
import CompareBar from "./CompareBar";
import ToastHost from "./ToastHost";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <ToastHost />
      
      {/* Top Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="px-6 py-4">
        {children}
      </div>

      {/* 🔥 Floating Compare Bar (GLOBAL) */}
      <CompareBar />
      
    </div>
  );
}