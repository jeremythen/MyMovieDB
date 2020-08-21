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
const moviesService_1 = __importDefault(require("../services/moviesService"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Router = express_1.default.Router();
Router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield moviesService_1.default.getMovies();
    handleCommonResponse(response, res);
}));
Router.post("/", authMiddleware_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield moviesService_1.default.createMovie(req.body);
    handleCommonResponse(response, res);
}));
Router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.param('id'));
    const response = yield moviesService_1.default.getMovieById(id);
    handleCommonResponse(response, res);
}));
Router.post("/reviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield moviesService_1.default.addMovieReview(req.body);
    handleCommonResponse(response, res);
}));
Router.get("/reviews/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.param('id'));
    const response = yield moviesService_1.default.getMovieReviews(id);
    handleCommonResponse(response, res);
}));
Router.put("/disable/:id", authMiddleware_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.param('id'));
    const response = yield moviesService_1.default.disableMovie(id);
    handleCommonResponse(response, res);
}));
const handleCommonResponse = (MyMovieDbResponse, res) => {
    if (!MyMovieDbResponse.success) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).send(MyMovieDbResponse);
    }
    res.send(MyMovieDbResponse);
};
exports.default = Router;
