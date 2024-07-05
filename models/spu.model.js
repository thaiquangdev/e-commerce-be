import mongoose from "mongoose";
import { Types } from "mongoose";

const SpuSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  description: {
    type: [String],
  },
  priceOld: {
    type: Number,
  },
  priceNew: { type: Number },
  thumb: {
    type: String,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  sold: {
    type: Number,
    default: 0,
  },
  variants: [{ type: Types.ObjectId, ref: "Sku" }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  totalRatings: {
    type: Number,
    default: 0,
  },
});

const Spu = new mongoose.model("Spu", SpuSchema);
export default Spu;
