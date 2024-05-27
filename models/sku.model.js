import mongoose from "mongoose";
import { Types } from "mongoose";

const SkuSchema = new mongoose.Schema({
  ram: {
    type: String,
  },
  color: {
    type: String,
  },
  priceOld: {
    type: Number,
  },
  priceNew: {
    type: String,
  },
  stock: {
    type: Number,
  },
  thumb: {
    type: String,
  },
  images: [{ type: String }],
  spu: { type: Types.ObjectId, ref: "Spu", require: true },
});

const Sku = new mongoose.model("Sku", SkuSchema);
export default Sku;
