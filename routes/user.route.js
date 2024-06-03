import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password/:token", UserController.resetPassword);
router.put("/change-password", authentication, UserController.changePassword);

export default router;
