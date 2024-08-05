import express from "express";
import * as paymentController from "../controllers/payment.controller";
import { authentication } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/checkout", authentication, paymentController.checkOut);

export default router;
