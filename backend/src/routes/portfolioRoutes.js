import express from "express";
import { getAllPortfolioData } from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/all", getAllPortfolioData);

export default router;
