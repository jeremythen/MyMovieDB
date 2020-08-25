import jwt from 'jsonwebtoken';
import User from '../db/models/User';
import log4js from 'log4js';

const logger = log4js.getLogger();

export const generateJwtToken = (user: User): string => {
    const secret = process.env.JWT_SECRET || '';
    try {
        logger.info(`Generation token for user: ${user.username}`);

        const { username, email } = user;

        const data = { username, email };

        return jwt.sign(data, secret, {
            expiresIn: '7d',
        });
    } catch (error) {
        logger.error('Error generating Jwt token', error);
        return '';
        
    }

}

export const verifyToken = (jwtToken: string): UserTokenData | null => {
    logger.info(`Verifying token`);
    const secret = process.env.JWT_SECRET || '';
    try {
        const userTokenData = <UserTokenData> jwt.verify(jwtToken, secret);
        return userTokenData;
    } catch (e) {
        return null;
    }
}

export interface UserTokenData {
    email: string;
    username: string;
}