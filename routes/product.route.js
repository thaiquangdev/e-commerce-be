import express from "express";
import * as productController from "../controllers/product.controller.js";
import { authentication, authorize } from "../middlewares/auth.middleware.js";
import uploadClound from "../config/coundinary.js";
const router = express.Router();

router.post(
  "/spu",
  authentication,
  authorize,
  uploadClound.single("image"),
  productController.createSpu
);
router.post(
  "/sku",
  authentication,
  authorize,
  uploadClound.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 20 },
  ]),
  productController.createSku
);
router.get("/", productController.getAllSpu);
router.get("/:slug", productController.getSpu);

export default router;
