import expressAsyncHandler from "express-async-handler";
import Spu from "../models/spu.model.js";
import Rating from "../models/rating.model.js";

export const ratingProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId, comment, rating } = req.body;

    const product = await Spu.findById(productId);
    if (!product) {
      return res.status(400).json({
        status: "error",
        message: "Product not found",
      });
    }

    let existingRating = await Rating.findOne({ userId: _id, productId });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment;
      existingRating.createdAt = new Date();
      await existingRating.save();
    } else {
      const newRating = new Rating({ userId: _id, productId, rating, comment });
      await newRating.save();
      product.ratings.push(newRating._id);
    }

    const allRatings = await Rating.find({ productId });
    const total = allRatings.reduce((sum, rate) => sum + rate.rating, 0);
    product.totalRatings = total / allRatings.length;

    await product.save();
    res.status(200).json({
      status: "success",
      message: "Review product successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
