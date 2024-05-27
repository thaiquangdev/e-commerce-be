import jwt from "jsonwebtoken";

export const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_TOKEN, { expiresIn: "1d" });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "5d" });
};
