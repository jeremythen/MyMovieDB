import express from 'express';
import { authorize } from '../middleware/authMiddleware';
import actorService from '../services/actorService';
import { handleCommonResponse } from '../util/util';

const Router = express.Router();

Router.get("/", async (req, res) => {
    const response = await actorService.getActors();
    handleCommonResponse(response, res);
});

Router.post("/", authorize, async (req, res) => {
    const response = await actorService.createActor(req.body);
    handleCommonResponse(response, res);
});

Router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const response = await actorService.getActorById(id);
    handleCommonResponse(response, res);
});

export default Router;