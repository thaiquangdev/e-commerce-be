import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spu",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ram: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);
const Cart = new mongoose.model("Cart", cartSchema);
export default Cart;
