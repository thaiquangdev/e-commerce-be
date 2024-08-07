import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/connectDb.js";
import { initialRoute } from "./routes/index.js";
import passport from "./utils/passports/passport.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);

connectDb();

initialRoute(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
