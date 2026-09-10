import React, { useState, useEffect } from "react";
import { statusAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CurrentlyBuildingWidget = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState({
    title: "Building WorkQuora v2 & CHH School Ecosystem",
    subtitle: "Real-time dispatch engine & payment escrow",
    link: "https://www.workquora.com",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(status);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await statusAPI.getStatus();
        if (data) {
          setStatus(data);
          setEditForm(data);
        }
      } catch {
        // Fallback default status
      }
    };
    fetchStatus();
  }, []);

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await statusAPI.updateStatus(
        editForm.title,
        editForm.subtitle,
        editForm.link,
        editForm.active
      );
      setStatus(updated);
      setIsEditing(false);
    } catch (err) {
      alert(err.message || "Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  if (!status.active) return null;

  return (
    <div className="relative z-20 mb-6 inline-flex flex-col items-center">
      {/* Live Badge Pill */}
      <div className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-500/15">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
        </span>

        <span className="text-[11px] font-mono text-purple-300 font-semibold tracking-wide flex items-center gap-1.5 flex-wrap">
          <span className="text-gray-400 font-normal">CURRENTLY BUILDING:</span>
          <a
            href="https://www.workquora.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white underline decoration-purple-500/50 underline-offset-4 transition"
          >
            WorkQuora v2
          </a>
          <span className="text-gray-500 font-normal">&</span>
          <a
            href="https://chh-school-management-system.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white underline decoration-purple-500/50 underline-offset-4 transition"
          >
            CHH School Ecosystem
          </a>
        </span>

        {/* Admin Edit Trigger */}
        {user && user.role === "admin" && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-2 text-xs text-purple-400 hover:text-white transition cursor-pointer"
            title="Edit Currently Building Status"
          >
            <i className="ri-edit-line" />
          </button>
        )}
      </div>

      {/* Admin Edit Form Dropdown */}
      {isEditing && user && user.role === "admin" && (
        <form
          onSubmit={handleSaveStatus}
          className="mt-3 p-4 rounded-2xl bg-[#0e1322] border border-purple-500/30 text-xs flex flex-col gap-3 w-80 shadow-2xl text-left"
        >
          <p className="font-bold font-mono text-purple-300">Update Status Widget</p>
          <div>
            <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Status Title</label>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              required
              className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Target Link URL</label>
            <input
              type="url"
              value={editForm.link}
              onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-1.5 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
            >
              {saving ? "Saving..." : "Save Status"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CurrentlyBuildingWidget;
