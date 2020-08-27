import express from 'express';
import MovieService from "../services/MovieService";
import { authorize, loggedInUser, getLoggedInUser } from '../middleware/authMiddleware';
import { handleCommonResponse } from '../util/util';

const Router = express.Router();

const movieService = new MovieService();

Router.get("/", async (req, res) => {

    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);

    let response;

    if (!Number.isNaN(offset) && !Number.isNaN(limit)) {
        response = await movieService.getMoviesWithOffsetAndLimit(offset, limit);
    } else if (!Number.isNaN(offset)) {
        response = await movieService.getMoviesWithOffset(offset);
    } else if (!Number.isNaN(limit)) {
        response = await movieService.getMoviesWithLimit(limit);
    } else {
        response = await movieService.getMovies();
    }

    handleCommonResponse(response, res);
});

Router.post("/", authorize, async (req, res) => {
    const response = await movieService.createMovie(req.body);
    handleCommonResponse(response, res);
});

Router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.getMovieById(id);
    handleCommonResponse(response, res);
});

Router.get("/reviews/movie/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.getMovieReviews(id);
    handleCommonResponse(response, res);
});

Router.put("/:id/disable", authorize, async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.disableMovie(id);
    handleCommonResponse(response, res);
});

Router.post("/:id/reviews", loggedInUser, async (req, res) => {
    const id = Number(req.params.id);
    const user = await getLoggedInUser(req);
    const payload = { ...req.body, reviewerId: user?.id };
    const response = await movieService.addMovieReview(id, payload);
    handleCommonResponse(response, res);
});

Router.get("/:id/reviews", async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.getMovieReviews(id);
    handleCommonResponse(response, res);
});

Router.get("/:id/reviews/reviewer/:reviewerId", async (req, res) => {
    const movieId = Number(req.params.id);
    const reviewerId = Number(req.params.reviewerId);
    const response = await movieService.getReviewByReviewerIdAndMovieId(reviewerId, movieId);
    handleCommonResponse(response, res);
});

Router.get("/reviews/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.getReviewById(id);
    handleCommonResponse(response, res);
});

Router.get("/reviews/reviewer/:reviewerId", async (req, res) => {
    const reviewerId = Number(req.params.reviewerId);
    const response = await movieService.getReviewerReviews(reviewerId);
    handleCommonResponse(response, res);
});


Router.get("/:id/casts", async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.getMovieCasts(id);
    handleCommonResponse(response, res);
});

Router.post("/:id/casts", authorize, async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.addMovieCast(id, req.body);
    handleCommonResponse(response, res);
});

Router.post("/:id/directors", authorize, async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.addMovieDirector(id, req.body);
    handleCommonResponse(response, res);
});

Router.get("/:id/directors", async (req, res) => {
    const id = Number(req.params.id);
    const response = await movieService.getMovieDirectors(id);
    handleCommonResponse(response, res);
});

export default Router;