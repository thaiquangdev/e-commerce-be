import expressAsyncHandler from "express-async-handler";
import Sku from "../models/sku.model.js";
import Spu from "../models/spu.model.js";
import slugify from "slugify";

export const createSpu = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, priceOld, priceNew, brand, category } =
      req.body;
    const thumb = req.file.path;
    const spu = new Spu({
      title,
      description,
      priceOld,
      priceNew,
      thumb,
      brand,
      category,
      slug: slugify(title),
    });
    await spu.save();

    res.status(200).json({
      status: "success",
      spu,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

export const createSku = expressAsyncHandler(async (req, res) => {
  try {
    const { ram, color, priceOld, priceNew, stock, spuId } = req.body;
    const thumb = req.files.thumb[0].path;
    const images = req.files.images.map((file) => file.path);

    const skuDocuments = new Sku({
      ram,
      color,
      priceOld,
      priceNew,
      stock,
      thumb,
      images,
      spu: spuId,
    });

    const savedSku = await skuDocuments.save();

    await Spu.findByIdAndUpdate(spuId, {
      $push: { variants: savedSku._id },
    });

    res.status(200).json({
      status: "success",
      skus: savedSku,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

export const getAllSpu = expressAsyncHandler(async (req, res) => {
  try {
    const { sort, search, brand, category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    //filter
    const brandFilter = brand ? { brand } : {};

    const categoryFilter = category ? { category } : {};

    // search
    const title = search ? { title: { $regex: search, $options: "i" } } : {};

    const count = await Spu.countDocuments({
      ...brandFilter,
      ...categoryFilter,
      ...title,
    });

    const products = await Spu.find({
      ...title,
      ...brandFilter,
      ...categoryFilter,
    })
      .sort(sort)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate("variants")
      .exec();

    res.status(200).json({
      status: "success",
      page,
      pages: Math.ceil(count / limit),
      limit,
      totalProduct: count,
      products,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: `Error ${error.message}` });
  }
});

export const getSpu = expressAsyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Spu.findOne({ slug })
      .populate("variants")
      .populate({
        path: "ratings",
        populate: {
          path: "userId",
        },
      })
      .exec();
    const relateProduct = await Spu.find({
      brand: product.brand,
      _id: { $ne: product._id },
    });
    res.status(200).json({ status: "success", product, relateProduct });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: `Error ${error.message}` });
  }
});

export const updateSpu = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateSpu = await Spu.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: "success", updateSpu });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: `Error ${error.message}` });
  }
});

export const updateSku = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateSku = await Spu.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: "success", updateSku });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: `Error ${error.message}` });
  }
});
