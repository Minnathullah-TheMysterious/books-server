"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = __importDefault(require("./db/mongo"));
const bookRoute_1 = __importDefault(require("./routes/bookRoute"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
//Connect to database
(0, mongo_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("build"));
//Routes
app.use("/api/v1/book", bookRoute_1.default);
const rootDir = path_1.default.join(__dirname, '..');
// serve static files
app.use("*", function (req, res) {
    res.sendFile(path_1.default.join(rootDir, "build/index.html"));
});
app.listen(port, () => {
    console.log("App listening on port " + port);
});
