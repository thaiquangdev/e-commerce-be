import express from "express";
import * as WishlistController from "../controllers/wishlist.controller.js";
import { authentication, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authentication, WishlistController.createWishlist);
router.get("/", authentication, WishlistController.getWishlist);

export default router;
