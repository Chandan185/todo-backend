import express, { urlencoded } from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/db.js";
import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
import { notFound, handleError } from "./Middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
ConnectDB();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.BASE_URL}`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(handleError);
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
