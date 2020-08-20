import jwt from 'jsonwebtoken';
import User from '../db/models/User';

// Using || '' to bypass typescript undefined check for jwt.sign.
const secret: string = process.env.JWT_SECRET || '';

export const generateJwtToken = (user: User): string => {

    const { username, email } = user;

    const data = { username, email };

    return jwt.sign(data, secret, {
        expiresIn: '7d',
    });

}

export const verifyToken = (jwtToken: string): UserTokenData | null => {
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