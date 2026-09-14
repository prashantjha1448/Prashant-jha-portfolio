import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";

dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://prashant-jha-portfolio.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());

// Root API Health Check Route
app.get("/", (req, res) => {
  res.json({
    status: "API Online",
    message: "Prashant Jha Portfolio MERN Backend Services",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/status", statusRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: "API Endpoint Not Found." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[Global Error]:", err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`[Server] Portfolio backend running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`[Port Conflict]: Port ${PORT} is occupied (macOS AirPlay). Retrying on port 5002...`);
    app.listen(5002, () => {
      console.log(`[Server] Portfolio backend running on fallback port 5002`);
    });
  }
});
