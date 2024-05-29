import sendEmail from "../mails/sendMail.js";
import User from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import crypto from "crypto";
import bcrypt from "bcrypt";

// forgot password
export const forgotPassword = expressAsyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(400).json({
        status: "error",
        message: "User not exists!",
      });
    }
    const resetToken = userExists.createPasswordResetToken();
    await userExists.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/users/reset-password/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    // send mail
    await sendEmail({
      email: userExists.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// reset password
export const resetPassword = expressAsyncHandler(async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", message: "Token is invalid or has expired" });
    }

    (user.password = req.body.password), (user.passwordResetToken = undefined);
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
      success: "success",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// change password with id
export const changePassword = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { OldPassword, NewPassword } = req.body;

    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(400).json({
        status: "error",
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(OldPassword, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Old password is not correct",
      });
    }

    const salt = await bcrypt.genSalt(10);
    userExists.password = await bcrypt.hash(NewPassword, salt);

    await userExists.save();

    res.status(200).json({
      status: "success",
      message: "Password changed successfully!",
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
