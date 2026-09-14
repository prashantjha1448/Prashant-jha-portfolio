import React from "react";
import { useAdminAuth } from "../context/AdminAuthContext";

const Navbar = ({ title }) => {
  const { adminUser } = useAdminAuth();

  return (
    <header className="w-full bg-[#0e1322]/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">{title}</h1>
        <p className="text-xs text-gray-400">Manage portfolio database, reviews moderation & system metrics</p>
      </div>

      <div className="flex items-center gap-4">
        {/* API Health Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Backend Live
        </div>

        {/* User Badge */}
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-white">{adminUser?.name || "Admin User"}</p>
          <p className="text-[10px] text-purple-400 font-mono">Role: {adminUser?.role || "Administrator"}</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
