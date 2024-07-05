import Category from "../models/category.model.js";
import expressAsyncHandler from "express-async-handler";

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { category, brands } = req.body;
    const image = req.file.path;
    const newCategory = new Category({
      category: category,
      brands,
      image,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({
      status: "success",
      category: savedCategory,
    });
  } catch (error) {
    res.status(400).json({ status: "errror", message: error.message });
  }
});

export const getAllCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const categoryTitle = search
      ? { title: { $regex: search, $options: "i" } }
      : {};
    const count = await Category.countDocuments({ ...categoryTitle });
    const getCategories = await Category.find({ ...categoryTitle })
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    res.status(200).json({
      status: "success",
      categories: getCategories,
      pages: Math.ceil(count / limit),
      totals: count,
      limit: limit,
    });
  } catch (error) {
    res.status(400).json({ status: "errror", message: error.message });
  }
});

export const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { category, brands } = req.body;
    const { image } = req.file.path;
    const updated = await Category.findByIdAndUpdate(
      id,
      {
        category,
        brands,
        image,
      },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      category: updated,
    });
  } catch {
    res.status(400).json({ status: "errror", message: error.message });
  }
});
