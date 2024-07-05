import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", authentication, cartController.createCart);
router.get("/", authentication, cartController.getAllCarts);
router.put("/:id", authentication, cartController.updateQuantityCart);
router.delete("/:id", authentication, cartController.deleteCart);
router.delete("/clear-cart", authentication, cartController.deleteAllCart);

export default router;
