import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

