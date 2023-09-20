import express, { Express } from "express";
import connectDB from "./modules/config/mongo";
import userRoute from "./modules/Users/interfaces/routes/userRoute";
import cors from "cors";
import adminRoute from "./modules/Admin/interfaces/routes/adminRoutes";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(cors({ origin: true, credentials: true }));
app.listen(5000, () => {
  console.log("connected ts");
});

connectDB();
app.use("/", userRoute);
app.use("/admin", adminRoute);

cloudinary.v2.config({
  cloud_name: "duhvcmhss",
  api_key: "441944377857495",
  api_secret: "g09PfHjDob_Awh735owiVRyHtsY",
});
