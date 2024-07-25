import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import userRoutes from "./src/routes/userRoutes";
import hrRoutes from "./src/routes/hrRoutes";
import { errorHandler } from './src/middleware/errorHandler';


const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/hr", hrRoutes);

app.use(errorHandler);

app.listen(3001, () => {
  console.log(`Server running at http://localhost:3001`);
});

