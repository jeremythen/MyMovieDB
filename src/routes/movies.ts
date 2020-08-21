import express, { Response } from 'express';
import moviesService from "../services/moviesService";
import { authorize } from '../middleware/authMiddleware';
import HttpStatus from 'http-status-codes';
import { MyMovieDbResponse } from '../util/util';

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

    const id = Number(req.param('id'));

    const response = await moviesService.getMovieById(id);

    handleCommonResponse(response, res);

});

Router.post("/reviews", async (req, res) => {

    const response = await moviesService.addMovieReview(req.body);

    handleCommonResponse(response, res);

});

Router.get("/reviews/:id", async (req, res) => {

    const id = Number(req.param('id'));

    const response = await moviesService.getMovieReviews(id);

    handleCommonResponse(response, res);

});

Router.put("/disable/:id", authorize, async (req, res) => {

    const id = Number(req.param('id'));

    const response = await moviesService.disableMovie(id);

    handleCommonResponse(response, res);

});

const handleCommonResponse = (MyMovieDbResponse: MyMovieDbResponse, res: Response) => {
    if (!MyMovieDbResponse.success) {
        return res.status(HttpStatus.BAD_REQUEST).send(MyMovieDbResponse);
    }
    res.send(MyMovieDbResponse);
}

export default Router;