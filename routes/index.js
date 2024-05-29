import productRoute from "./product.route.js";
import authRoute from "./auth.route.js";
import categoryRoute from "./category.route.js";
import userRoute from "./user.route.js";

export const initialRoute = (app) => {
  app.use("/api/products", productRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/category", categoryRoute);
  app.use("api/user", userRoute);
};
