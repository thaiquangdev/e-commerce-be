import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.put("/logout", authentication, authController.logout);

export default router;
