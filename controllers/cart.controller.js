import Cart from "../models/cart.model.js";
import expressAsyncHandler from "express-async-handler";
import Sku from "../models/sku.model.js";

export const createCart = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { skuId, quantity } = req.body;
    const sku = await Sku.findById(skuId).populate("spu");
    if (!sku) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    if (sku.stock < quantity) {
      return res.status(400).json({
        status: "error",
        message: "Not enough stock available",
      });
    }
    const newCart = new Cart({
      userId: _id,
      spuId: sku.spu._id,
      title: sku.spu.title,
      thumb: sku.thumb,
      quantity,
      price: sku.priceNew,
      ram: sku.ram,
      color: sku.color,
    });
    const cart = await newCart.save();
    sku.stock -= quantity;
    await sku.save();
    res.status(200).json({
      status: "success",
      message: "add to card is successfull!",
      cart,
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
    const { quantity } = req.body;

    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart item not found",
      });
    }
    const sku = await Sku.findOne({ spu: cart.spuId });
    if (!sku) {
      return res.status(404).json({
        status: "error",
        message: "SKU not found",
      });
    }

    const quantityDifference = quantity - cart.quantity;

    if (sku.stock < quantityDifference) {
      return res.status(400).json({
        status: "error",
        message: "Not enough stock available",
      });
    }

    cart.quantity = quantity;
    await cart.save();

    sku.stock -= quantityDifference;
    await sku.save();

    res.status(200).json({
      status: "success",
      message: "Cart updated successfully!",
      cart,
    });

    res.status(200).json({
      status: "success",
      message: "update cart is successfull!",
      cart: updateCart,
    });
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
