import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import { errorHandler } from './src/middleware/errorHandler';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

