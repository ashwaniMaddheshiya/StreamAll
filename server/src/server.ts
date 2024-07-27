import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import platformRoutes from "./routes/platformRoutes";
import cors from "cors";

const app: Express = express();

connectDB();
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Disable credentials if allowing all origins
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.use("/api/auth/v1", userRoutes);
app.use("/api/platform", platformRoutes);

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
