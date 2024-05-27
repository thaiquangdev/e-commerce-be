import Category from "../models/category.model.js";
import expressAsyncHandler from "express-async-handler";

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json({
      status: "success",
      createCategory,
    });
  } catch (error) {
    res.status(400).json({ status: "errror", message: error.message });
  }
});

export const getAllCategory = expressAsyncHandler(async (req, res) => {
  try {
    const getCategorys = await Category.find().exec();
    res.status(200).json({
      status: "success",
      getCategories,
    });
  } catch (error) {
    res.status(400).json({ status: "errror", message: error.message });
  }
});
