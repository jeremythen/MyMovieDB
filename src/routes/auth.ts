import session from 'express-session';
import express from 'express';
import User from '../db/models/User';
import userService from '../services/userService';
import { authorize } from '../middleware/authMiddleware';

const Router = express.Router();

Router.post('/register', async (req, res) => {

    const response = await userService.registerUser(req.body);

    if (!response.success) {
        return res.status(400).send(response);
    }

    res.send(response);

});

Router.post("/login", async (req, res) => {

    const response = await userService.login(req.body);

    if (!response.success) {
      return res.status(400).send(response);
    }

    res.send(response);

});

Router.get('/users', authorize, async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

export default Router;
