"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../config/db"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const course_routes_1 = __importDefault(require("../routes/course.routes"));
const category_routes_1 = __importDefault(require("../routes/category.routes"));
const teacher_routes_1 = __importDefault(require("../routes/teacher.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(express_1.default.static("uploads"));
const port = "3000";
app.use("/api", user_routes_1.default);
app.use("/api", course_routes_1.default);
app.use("/api/category", category_routes_1.default);
app.use("/api/teacher", teacher_routes_1.default);
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
