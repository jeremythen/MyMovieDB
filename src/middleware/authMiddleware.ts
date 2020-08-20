import { Response, Request, NextFunction } from "express";
import { verifyToken } from '../util/jwtTokenUtil';
import HttpStatus from 'http-status-codes';
import userService from '../services/userService';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {

    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const token = bearerToken.substr(7, bearerToken.length);

    const userData = verifyToken(token);

    if (userData === null) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const email = userData.email;
    
    const user = await userService.getUserByEmail(email);

    if (user === null) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const isAdmin = userService.isAdmin(user);

    if (!isAdmin) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    next();

}