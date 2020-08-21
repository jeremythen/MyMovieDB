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
const util_1 = require("../util/util");
const Router = express_1.default.Router();
Router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield moviesService_1.default.getMovies();
    util_1.handleCommonResponse(response, res);
}));
Router.post("/", authMiddleware_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield moviesService_1.default.createMovie(req.body);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield moviesService_1.default.getMovieById(id);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/reviews/movie/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield moviesService_1.default.getMovieReviews(id);
    util_1.handleCommonResponse(response, res);
}));
Router.put("/disable/:id", authMiddleware_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield moviesService_1.default.disableMovie(id);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/pagination/offset/:offset", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = Number(req.params.offset);
    const response = yield moviesService_1.default.getMoviesWithOffset(offset);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/pagination/limit/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.params.limit);
    const response = yield moviesService_1.default.getMoviesWithLimit(limit);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/pagination/offset/:offset/limit/:limit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);
    const response = yield moviesService_1.default.getMoviesWithOffsetAndLimit(offset, limit);
    util_1.handleCommonResponse(response, res);
}));
Router.post("/:id/reviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield moviesService_1.default.addMovieReview(id, req.body);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/:id/reviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield moviesService_1.default.getMovieReviews(id);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/:id/reviews/reviewer/:reviewerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = Number(req.params.id);
    const reviewerId = Number(req.params.reviewerId);
    const response = yield moviesService_1.default.getReviewByReviewerIdAndMovieId(reviewerId, movieId);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/reviews/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield moviesService_1.default.getReviewById(id);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/reviews/reviewer/:reviewerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewerId = Number(req.params.reviewerId);
    const response = yield moviesService_1.default.getReviewReviews(reviewerId);
    util_1.handleCommonResponse(response, res);
}));
exports.default = Router;
