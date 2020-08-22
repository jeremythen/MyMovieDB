"use strict";
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
const envConfig_1 = __importDefault(require("./config/envConfig"));
const users_1 = __importDefault(require("./routes/users"));
const movies_1 = __importDefault(require("./routes/movies"));
const directors_1 = __importDefault(require("./routes/directors"));
const actors_1 = __importDefault(require("./routes/actors"));
const app = express_1.default();
const port = envConfig_1.default.port || 3000;
app.use(body_parser_1.default.json());
app.use("/movies", movies_1.default);
app.use("/actors", actors_1.default);
app.use("/directors", directors_1.default);
app.use("/users", users_1.default);
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to MyMovieDB!");
}));
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
