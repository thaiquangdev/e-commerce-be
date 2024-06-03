import Cart from "../models/cart.model.js";
import expressAsyncHandler from "express-async-handler";

export const createCart = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const newCart = new Cart({
      userId: _id,
      ...req.body,
    });
    const cart = await newCart.save();
    res.status(200).json({
      status: "success",
      message: "add to card is successfull!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

export const getAllCarts = expressAsyncHandler(async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({
      status: "success",
      data: carts,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

export const updateQuantityCart = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "update cart is successfull!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

export const updateQuantityAllCart = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { items } = req.body;
    const bulkOperation = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id, userId: _id },
        update: { $set: { quantity: item.quantity } },
      },
    }));
    res.status(200).json({
      status: "success",
      message: "Cart quantities updated successfully!",
    });
    const rs = await Cart.bulkwrite(bulkOperation);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

export const deleteCart = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCart = await Cart.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "delete cart is successfull!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

export const deleteAllCart = expressAsyncHandler(async (req, res) => {
  try {
    const deleteAllCart = await Cart.deleteMany({ userId: req.user._id });
    res.status(200).json({
      status: "success",
      message: "delete all cart is successfull!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
