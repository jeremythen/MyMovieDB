import express from 'express';
import { authorize } from '../middleware/authMiddleware';
import { handleCommonResponse } from '../util/util';
import directorService from '../services/directorService';

const Router = express.Router();

Router.get("/", async (req, res) => {

    const response = await directorService.getDirectors();

    handleCommonResponse(response, res);

});

Router.post("/", authorize, async (req, res) => {

    const response = await directorService.createDirector(req.body);

    handleCommonResponse(response, res);

});

Router.get("/:id", async (req, res) => {

    const id = Number(req.params.id);

    const response = await directorService.getDirectorById(id);

    handleCommonResponse(response, res);

});

export default Router;