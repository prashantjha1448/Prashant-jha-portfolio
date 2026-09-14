import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const Sidebar = () => {
  const { adminUser, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: "ri-dashboard-3-line" },
    { label: "Reviews Manager", path: "/reviews", icon: "ri-message-3-line" },
    { label: "System Health", path: "/health", icon: "ri-pulse-line" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0e1322] border-r border-white/10 flex flex-col justify-between p-6">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            PJ
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">Prashant Jha</h1>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <i className={`${item.icon} text-lg`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Admin Profile & Logout */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
              {adminUser?.name?.charAt(0) || "A"}
            </div>
            <div className="truncate max-w-[110px]">
              <p className="text-xs font-bold text-white truncate">{adminUser?.name || "Admin User"}</p>
              <p className="text-[10px] text-gray-400 truncate">{adminUser?.email || "admin@prashantjha.com"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
          >
            <i className="ri-logout-box-r-line text-lg" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
