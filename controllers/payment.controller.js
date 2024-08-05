import Cart from "../models/cart.model";
import Payment from "../models/payment.model";
import expressAsyncHandler from "express-async-handler";

export const checkOut = expressAsyncHandler(async (req, res) => {
  try {
    const { userId, cartId, paymentMethod, amountPaid, currency } = req.body;
    const payment = new Payment({
      userId,
      cartId,
      paymentMethod,
      paymentStatus: "completed",
      amountPaid,
      currency,
    });
    const savePayment = await payment.save();
    res.status(200).json({
      status: "success",
      message: "payment successfully",
      payment: savePayment,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
