import express from 'express';
import moviesService from "../services/moviesService";

const Router = express.Router();

Router.get("/", async (req, res) => {
    
    const response = await moviesService.getMovies();

    res.send(response);

});

export default Router;