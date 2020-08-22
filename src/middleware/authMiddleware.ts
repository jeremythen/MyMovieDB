import { Response, Request, NextFunction } from "express";
import { verifyToken } from '../util/jwtTokenUtil';
import HttpStatus from 'http-status-codes';
import userService from '../services/userService';
import log4js from 'log4js';

const logger = log4js.getLogger();

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Checking if requester has authorization to access this endpoint:', req.originalUrl);

    const user = await checkRequesterTokenAndGetUser(req, res);
    
    const isAdmin = userService.isAdmin(user);

    logger.error(`User isAdmin?`, isAdmin);

    if (!isAdmin) {
        logger.error(`Requester is not an ADMIN and cannot access this endpoint`);
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    logger.error(`User exists and is ADMIN. Continue.`);

    next();

}

export const loggedInUser = async (req: Request, res: Response, next: NextFunction) => {

    logger.info('Checking if requester is logged in to access this endpoint:', req.originalUrl);

    const user = await checkRequesterTokenAndGetUser(req, res);

    if (user === null) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    // User exists and has valid token to access this endpoint. Continue.
    logger.error(`User exists and has valid token to access this endpoint. Continue.`);

    next();

}

const checkRequesterTokenAndGetUser = async (req: Request, res: Response) => {

    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
        logger.warn('Requester does not have a beareToken');
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const token = bearerToken.substr(7, bearerToken.length);

    const userData = verifyToken(token);

    if (userData === null) {
        logger.warn('Requester does not have a valid token');
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const email = userData.email;
    logger.info(`Requester email: ${email}`);
    const response = await userService.getUserByEmail(email);

    if (!response.success) {
        logger.error(`Error getting user with email ${email}.`, response);
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const user = response.data.user;

    return user;

}