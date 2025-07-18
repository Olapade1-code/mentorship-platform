import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import requestRoutes from "./routes/requestRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import adminRoutes from "./routes/adminRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/requests", authMiddleware, requestRoutes);
app.use("/sessions", authMiddleware, sessionRoutes);
app.use("/admin", authMiddleware, adminRoutes);

const PORT = 5000;
mongoose.connect("mongodb://localhost:27017/mentorship")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
