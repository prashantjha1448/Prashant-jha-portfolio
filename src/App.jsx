import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./Home";
import CaseStudy from "./Pages/CaseStudy";
import ResumePage from "./Pages/ResumePage";
import BlogPage from "./Pages/BlogPage";
import BlogPost from "./Pages/BlogPost";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AuthModal from "./Components/AuthModal";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="w-full min-h-screen bg-[#0b0f1a] text-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<CaseStudy />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AuthModal />
            <Analytics />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;