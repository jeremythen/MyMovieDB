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

Router.get('/', authorize, async (req, res) => {
    const response = await userService.getUsers();
    handleCommonResponse(response, res);
});

Router.get('/:username', authorize, async (req, res) => {
    const response = await userService.getUserByUsername(req.params.username);
    handleCommonResponse(response, res);
});

Router.delete('/:username', authorize, async (req, res) => {
    const response = await userService.deleteUserByUsername(req.params.username);
    handleCommonResponse(response, res);
});

Router.put('/:username/role', authorize, async (req, res) => {
    const username = req.params.username;
    const role = req.body.role;
    const response = await userService.updateUserRole(username, role);
    handleCommonResponse(response, res);
});


export default Router;
