"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = __importDefault(require("./db/mongo"));
const bookRoute_1 = __importDefault(require("./routes/bookRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
//Connect to database
(0, mongo_1.default)();
app.use(express_1.default.json());
//Routes
app.use('/api/v1/book', bookRoute_1.default);
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});
app.listen(port, () => { console.log('App listening on port ' + port); });
