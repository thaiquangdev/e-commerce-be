import express from "express";
import * as categoryController from "../controllers/category.controller.js";
import { authentication, authorize } from "../middlewares/auth.middleware.js";
import uploadClound from "../config/coundinary.js";

const router = express.Router();

router.post(
  "/",
  authentication,
  authorize("admin"),
  uploadClound.single("image"),
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategory);
router.put(
  "/:id",
  authentication,
  authorize,
  uploadClound.single("image", categoryController.updateCategory)
);
export default router;
