import express from 'express';
import moviesService from "../services/moviesService";
import { authorize, loggedInUser, getLoggedInUser } from '../middleware/authMiddleware';
import { handleCommonResponse } from '../util/util';
import log4js from 'log4js';

const logger = log4js.getLogger();

const Router = express.Router();

Router.get("/", async (req, res) => {
    const response = await moviesService.getMovies();
    handleCommonResponse(response, res);
});

Router.post("/", authorize, async (req, res) => {
    const response = await moviesService.createMovie(req.body);
    handleCommonResponse(response, res);
});

Router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await moviesService.getMovieById(id);
    handleCommonResponse(response, res);
});

Router.get("/reviews/movie/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await moviesService.getMovieReviews(id);
    handleCommonResponse(response, res);
});

Router.put("/:id/disable", authorize, async (req, res) => {
    const id = Number(req.params.id);
    const response = await moviesService.disableMovie(id);
    handleCommonResponse(response, res);
});

Router.get("/pagination/offset/:offset", async (req, res) => {
    const offset = Number(req.params.offset);
    const response = await moviesService.getMoviesWithOffset(offset);
    handleCommonResponse(response, res);
});

Router.get("/pagination/limit/:limit", async (req, res) => {
    const limit = Number(req.params.limit);
    const response = await moviesService.getMoviesWithLimit(limit);
    handleCommonResponse(response, res);
});

Router.get("/pagination/offset/:offset/limit/:limit", async (req, res) => {
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);
    const response = await moviesService.getMoviesWithOffsetAndLimit(offset, limit);
    handleCommonResponse(response, res);
});

Router.post("/:id/reviews", loggedInUser, async (req, res) => {
    const id = Number(req.params.id);
    const user = await getLoggedInUser(req);
    const payload = { ...req.body, reviewerId: user.id };
    const response = await moviesService.addMovieReview(id, payload);
    handleCommonResponse(response, res);
});

Router.get("/:id/reviews", async (req, res) => {
    const id = Number(req.params.id);
    const response = await moviesService.getMovieReviews(id);
    handleCommonResponse(response, res);
});

Router.get("/:id/reviews/reviewer/:reviewerId", async (req, res) => {
    const movieId = Number(req.params.id);
    const reviewerId = Number(req.params.reviewerId);
    const response = await moviesService.getReviewByReviewerIdAndMovieId(reviewerId, movieId);
    handleCommonResponse(response, res);
});

Router.get("/reviews/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await moviesService.getReviewById(id);
    handleCommonResponse(response, res);
});

Router.get("/reviews/reviewer/:reviewerId", async (req, res) => {
    const reviewerId = Number(req.params.reviewerId);
    const response = await moviesService.getReviewerReviews(reviewerId);
    handleCommonResponse(response, res);
});


export default Router;