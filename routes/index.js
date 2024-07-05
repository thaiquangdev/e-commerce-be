import productRoute from "./product.route.js";
import authRoute from "./auth.route.js";
import categoryRoute from "./category.route.js";
import userRoute from "./user.route.js";
import cartRoute from "./cart.route.js";
import wishlistRoute from "./wishlist.route.js";
import ratingRoute from "./rating.route.js";

export const initialRoute = (app) => {
  app.use("/api/products", productRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/user", userRoute);
  app.use("/api/cart", cartRoute);
  app.use("/api/wishlist", wishlistRoute);
  app.use("/api/rating", ratingRoute);
};
