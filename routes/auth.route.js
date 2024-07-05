import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", authController.login);
router.post("/login-admin", authController.loginAdmin);
router.post("/register", authController.register);
router.put("/logout", authentication, authController.logout);
router.get("/google", authController.google);
router.get("/google/callback", authController.googleCallback);

export default router;
