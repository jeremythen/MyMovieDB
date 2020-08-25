import { Response, Request, NextFunction } from "express";
import { verifyToken } from '../util/jwtTokenUtil';
import HttpStatus from 'http-status-codes';
import UserService from '../services/UserService';
import log4js from 'log4js';

const logger = log4js.getLogger();

const userService = new UserService();

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Checking if requester has authorization to access this endpoint:', req.originalUrl);

    const user = await checkRequesterTokenAndGetUser(req, res);

    if (user === null) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    
    const isAdmin = userService.isAdmin(user);

    logger.info(`User isAdmin?`, isAdmin);

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

    if (user === null) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    // User exists and has valid token to access this endpoint. Continue.
    logger.info(`User exists and has valid token to access this endpoint. Continue.`);

    req.loggedInUser = user;

    next();

}

const checkRequesterTokenAndGetUser = async (req: Request, res: Response) => {

    const bearerToken = req.header('Authorization');
    
    if (!bearerToken) {
        logger.warn('Requester does not have a bearerToken');
        return null
    }

    const token = bearerToken.substr(7, bearerToken.length);

    const userData = verifyToken(token);

    if (userData === null) {
        logger.warn('Requester does not have a valid token');
        return null;
    }

    const email = userData.email;
    logger.info(`Requester email: ${email}`);
    const response = await userService.getUserByEmail(email);

    if (!response.success) {
        logger.error(`Error getting user with email ${email}.`, response);
        return null;
    }

    const user = response.data.user;

    return user;

}

export const getLoggedInUser = async (req: Request) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) return null;

    const token = bearerToken.substr(7, bearerToken.length);

    const userData = verifyToken(token);

    if (userData === null) return null;

    const email = userData.email;
    logger.info(`Requester email: ${email}`);
    const response = await userService.getUserByEmail(email);

    const user = response.data.user;

    return user;
}