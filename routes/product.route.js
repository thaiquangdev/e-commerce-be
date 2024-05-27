import express from "express";
import * as productController from "../controllers/product.controller.js";
const router = express.Router();

router.post("/spu", productController.createSpu);
router.post("/sku", productController.createSku);
router.get("/", productController.getAllSpu);
router.get("/:id", productController.getSpu);

export default router;
