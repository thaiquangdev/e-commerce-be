import {
  generateRefreshToken,
  generateToken,
} from "../middlewares/jwt.middleware.js";
import User from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// register user
export const register = expressAsyncHandler(async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res
        .status(400)
        .json({ status: "error", message: "Email is already. Please login!" });
    }
    const user = await User.create(req.body);
    res.status(200).json({
      status: "success",
      message: "register is successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

// login user
export const login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "error",
        message: "email and password is required",
      });
    }
    const userExists = await User.findOne({ email }).select("+password");
    if (!userExists || !bcrypt.compareSync(password, userExists.password)) {
      res.status(400).json({
        status: "error",
        message: "Email or password is incorrect",
      });
    }
    const token = generateToken(userExists._id, email);
    const refreshToken = generateRefreshToken(userExists._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    await User.findByIdAndUpdate(
      userExists._id,
      { refreshToken },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Login is sucessfully",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

// logout
export const logout = expressAsyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
      res.status(400).json({ message: "Not authorizon", status: "error" });
    }
    await User.findOneAndUpdate(
      { refreshToke: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    res.status(200).json({ message: "logout done!", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});
