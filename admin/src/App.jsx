import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import Sidebar from "./components/Sidebar";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectsManager from "./pages/ProjectsManager";
import ExperienceManager from "./pages/ExperienceManager";
import EducationManager from "./pages/EducationManager";
import SkillsManager from "./pages/SkillsManager";
import BlogManager from "./pages/BlogManager";
import ResumeManager from "./pages/ResumeManager";
import ReviewsManager from "./pages/ReviewsManager";
import SystemHealth from "./pages/SystemHealth";

const ProtectedLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0b0f1a] flex items-center justify-center text-xs font-mono text-purple-400">
        Loading Admin Session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />

          <Route
            path="/"
            element={
              <ProtectedLayout>
                <AdminDashboard />
              </ProtectedLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedLayout>
                <ProjectsManager />
              </ProtectedLayout>
            }
          />
          <Route
            path="/experience"
            element={
              <ProtectedLayout>
                <ExperienceManager />
              </ProtectedLayout>
            }
          />
          <Route
            path="/education"
            element={
              <ProtectedLayout>
                <EducationManager />
              </ProtectedLayout>
            }
          />
          <Route
            path="/skills"
            element={
              <ProtectedLayout>
                <SkillsManager />
              </ProtectedLayout>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedLayout>
                <BlogManager />
              </ProtectedLayout>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedLayout>
                <ResumeManager />
              </ProtectedLayout>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedLayout>
                <ReviewsManager />
              </ProtectedLayout>
            }
          />
          <Route
            path="/health"
            element={
              <ProtectedLayout>
                <SystemHealth />
              </ProtectedLayout>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};

export default App;
