import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  brands: {
    type: [String],
  },
});

const Category = new mongoose.model("Categories", categorySchema);
export default Category;
