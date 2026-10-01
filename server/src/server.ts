import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import authRoutes from "./routes/auth";
import conversionRoutes from "./routes/conversion";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/conversions", conversionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Remote SIM → eSIM API is running",
    status: "success",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();