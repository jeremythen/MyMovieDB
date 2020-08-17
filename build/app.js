"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = __importDefault(require("./routes/movies"));
const body_parser_1 = __importDefault(require("body-parser"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const app = express_1.default();
const port = envConfig_1.default.port || 3000;
app.use(body_parser_1.default.json());
app.use("/movies", movies_1.default);
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
