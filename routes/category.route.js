import express from "express";
import * as categoryController from "../controllers/category.controller.js";
import { authentication, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authentication,
  authorize("admin"),
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategory);
export default router;
