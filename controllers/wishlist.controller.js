import Wishlist from "../models/wishlist.model.js";
import expressAsyncHandler from "express-async-handler";

export const createWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: _id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: _id, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        // include dùng để kiểm tra phần tử trong mảng đã tồn tại chưa
        wishlist.products.push(productId);
      } else {
        wishlist.products.pull(productId);
      }
    }
    await wishlist.save();
    res.status(200).json({
      status: "success",
      wishlist,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

export const getWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const wishlist = await Wishlist.findOne({ userId: _id }).populate(
      "products"
    );
    res.status(200).json({
      status: "success",
      wishlist,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
