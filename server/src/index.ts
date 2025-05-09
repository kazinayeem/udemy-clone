import express, { Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import db from "./config/db";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";
import categoryRoutes from "./routes/category.routes";
import teacherRoutes from "./routes/teacher.routes";
import userPartRoutes from "./routes/user-part.routes";
import enrollmentRoutes from "./routes/enrollment.routes";
import reviewRoutes from "./routes/review.routes";
import { generateCourseDescription } from "./controller/ai.controller";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://192.168.0.104:3000",
      "http://192.168.0.104:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    // parseNested: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));

const port = "8080";
app.post("/api/generate-description", generateCourseDescription);
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/client", userPartRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/review", reviewRoutes);

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
    .then((): void => {
      console.log("Connected to the database successfully");
    })
    .catch((error: Error): void => {
      console.error("Error connecting to the database:", error);
    });

  console.log(`Example app listening on port ${port}`);
});
