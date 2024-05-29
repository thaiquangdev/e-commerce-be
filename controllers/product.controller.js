import expressAsyncHandler from "express-async-handler";
import Sku from "../models/sku.model.js";
import Spu from "../models/spu.model.js";
import slugify from "slugify";

export const createSpu = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, priceOld, priceNew, thumb, brand, category } =
      req.body;
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
    const skus = req.body;

    if (!Array.isArray(skus)) {
      return res.status(400).json({
        status: "error",
        message: "Payload should be an array of SKUs",
      });
    }

    const spuId = skus[0].spuId;
    const skuDocuments = skus.map((sku) => ({
      ram: sku.ram,
      color: sku.color,
      priceOld: sku.priceOld,
      priceNew: sku.priceNew,
      stock: sku.stock,
      thumb: sku.thumb,
      images: sku.images,
      spu: spuId,
    }));

    const savedSkus = await Sku.insertMany(skuDocuments);
    const skuIds = savedSkus.map((sku) => sku._id);

    await Spu.findByIdAndUpdate(spuId, {
      $push: { variants: { $each: skuIds } },
    });

    res.status(200).json({
      status: "success",
      skus: savedSkus,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

export const getAllSpu = expressAsyncHandler(async (req, res) => {
  try {
    const { sort, search, brand, category } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

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
    const product = await Spu.findOne({ slug }).populate("variants").exec();
    res.status(200).json({ status: "success", product });
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
