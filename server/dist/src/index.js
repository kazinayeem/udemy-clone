"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const db_1 = __importDefault(require("./config/db"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const user_part_routes_1 = __importDefault(require("./routes/user-part.routes"));
const enrollment_routes_1 = __importDefault(require("./routes/enrollment.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const ai_controller_1 = require("./controller/ai.controller");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    // parseNested: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(express_1.default.static("uploads"));
const port = "8080";
app.post("/api/generate-description", ai_controller_1.generateCourseDescription);
app.use("/api", user_routes_1.default);
app.use("/api", course_routes_1.default);
app.use("/api/category", category_routes_1.default);
app.use("/api/teacher", teacher_routes_1.default);
app.use("/api/client", user_part_routes_1.default);
app.use("/api/enrollment", enrollment_routes_1.default);
app.use("/api/review", review_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Response sent");
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
    next();
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});
app.listen(port, () => {
    db_1.default.$connect()
        .then(() => {
        console.log("Connected to the database successfully");
    })
        .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
    console.log(`Example app listening on port ${port}`);
});
