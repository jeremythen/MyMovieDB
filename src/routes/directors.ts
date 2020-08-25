import express from 'express';
import { authorize } from '../middleware/authMiddleware';
import { handleCommonResponse } from '../util/util';
import DirectorService from '../services/DirectorService';

const Router = express.Router();
const directorService = new DirectorService();

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

Router.delete("/:id", authorize, async (req, res) => {
    const id = Number(req.params.id);
    const response = await directorService.deleteDirectorById(id);
    handleCommonResponse(response, res);
});


export default Router;