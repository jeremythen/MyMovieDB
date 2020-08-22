"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const movies_1 = __importDefault(require("./routes/movies"));
const directors_1 = __importDefault(require("./routes/directors"));
const actors_1 = __importDefault(require("./routes/actors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDoc = __importStar(require("./swagger.json"));
const dotenv_1 = __importDefault(require("dotenv"));
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: { fileAppender: { type: 'file', filename: './logs/logs.log' } },
    categories: { default: { appenders: ['fileAppender'], level: 'info' } }
});
const logger = log4js_1.default.getLogger();
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.port || 3000;
app.use(body_parser_1.default.json());
app.use("/movies", movies_1.default);
app.use("/actors", actors_1.default);
app.use("/directors", directors_1.default);
app.use("/users", users_1.default);
/**
 * Swagger docs for MyMovieDB app can be visualized at this endpoint:
 */
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to MyMovieDB!");
}));
app.listen(port, () => {
    logger.info(`Running on port ${port}`);
});
exports.default = app;
