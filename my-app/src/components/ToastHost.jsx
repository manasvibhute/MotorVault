import { useEffect, useState } from "react";

// Global lightweight toast system:
// window.dispatchEvent(new CustomEvent("toast", { detail: { message, kind } }))
export default function ToastHost() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer = null;

    const onToast = (e) => {
      const message = e?.detail?.message;
      if (!message) return;

      const kind = e?.detail?.kind || "info";
      setToast({ message, kind });

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 2200);
    };

    window.addEventListener("toast", onToast);
    return () => {
      window.removeEventListener("toast", onToast);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;

  const base =
    "fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm max-w-[90vw]";
  const variants = {
    info: "bg-[#111827] border-gray-700 text-white",
    success: "bg-[#052e1a] border-green-700 text-green-100",
    error: "bg-[#2a0a0a] border-red-700 text-red-100",
    warning: "bg-[#2a200a] border-yellow-700 text-yellow-100",
  };

  return (
    <div className={`${base} ${variants[toast.kind] || variants.info}`}>
      {toast.message}
    </div>
  );
}

