import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";

export const authentication = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = await User.findById(decode.id);
      next();
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Not authorized, token fail",
      });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, token fail" });
  }
});

export const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "you are not admin",
      });
    }
    next();
  };
};
