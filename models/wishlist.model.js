import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spu",
    },
  ],
});

const Wishlist = new mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
