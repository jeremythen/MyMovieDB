import express from 'express';
import userService from '../services/userService';
import { authorize } from '../middleware/authMiddleware';
import { handleCommonResponse } from '../util/util';

const Router = express.Router();

Router.post('/register', async (req, res) => {
    const response = await userService.registerUser(req.body);
    handleCommonResponse(response, res);
});

Router.post("/login", async (req, res) => {
    const response = await userService.login(req.body);
    handleCommonResponse(response, res);
});

Router.get('/users', authorize, async (req, res) => {
    const response = await userService.getUsers();
    handleCommonResponse(response, res);
});

export default Router;
