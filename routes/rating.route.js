import express from "express";
import * as Rating from "../controllers/rating.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/rating-product", authentication, Rating.ratingProduct);

export default router;
