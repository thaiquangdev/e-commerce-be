import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "User name is required"],
  },
  mobile: {
    type: String,
    require: [true, "Mobile is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLocaleLowerCase()
          .match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (prop) => `Email {${prop.value}} in valid`,
    },
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "user",
  },
  refreshToken: { type: String },
  passwordChangeAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minute
  return resetToken;
};

const User = new mongoose.model("User", userSchema);
export default User;
