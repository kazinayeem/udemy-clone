import express, { Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import db from "../config/db";
import userRoutes from "../routes/user.routes";
import courseRoutes from "../routes/course.routes";
import categoryRoutes from "../routes/category.routes";
import teacherRoutes from "../routes/teacher.routes";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));

const port = "3000";
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/teacher", teacherRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.use((req: Request, res: Response, next: Function) => {
  res.status(404).json({ message: "Route not found" });
  next();
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  db.$connect()
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });

  console.log(`Example app listening on port ${port}`);
});
