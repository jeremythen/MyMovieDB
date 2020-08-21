import express from 'express';
import moviesService from "../services/moviesService";
import { authorize } from '../middleware/authMiddleware';
import { handleCommonResponse } from '../util/util';

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

Router.post("/reviews", async (req, res) => {
    const response = await moviesService.addMovieReview(req.body);
    handleCommonResponse(response, res);
});

Router.get("/reviews/movie/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await moviesService.getMovieReviews(id);
    handleCommonResponse(response, res);
});

Router.put("/disable/:id", authorize, async (req, res) => {
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

export default Router;