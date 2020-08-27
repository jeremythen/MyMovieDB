import { expect } from 'chai';
import UserService from '../services/UserService';
import { UserError } from '../util/enums';
import User from '../db/models/User';

import log4js from 'log4js';

log4js.configure({
    appenders: { fileAppender: { type: 'file', filename: './logs/test_logs.log' } },
    categories: { default: { appenders: ['fileAppender'], level: 'info' } }
});

const logger = log4js.getLogger();

const { USER_INVALID_ID, USER_NOT_FOUND } = UserError;

const userService = new UserService();

describe('Users tests', () => {
    logger.info('Users tests');
    it('should create user', async () => {
        const response = await userService.registerUser({
            firstName: 'Jeremy',
            lastName: 'Then',
            email: 'jeremy@gmail.com',
            username: 'jthen',
            password: 'mypass',
        });

        expect(response === null).to.be.false;

        expect(response.success).to.be.true;

        const username = response.data?.user.username;

        expect(username).to.equal('jthen');

    });

    it('should get user by inexistent username', async () => {
        const response = await userService.getUserByUsername('oasdfkajsdglkasdg');

        expect(response === null).to.be.false;

        expect(response.success, 'Expecting userService response to be unsuccessful').to.be.false;

        expect(response.data, 'Expecting data to be null since no user is found').to.be.null;

        expect(response.errorCode, `Expected to see '${USER_NOT_FOUND} but got '${response.errorCode}`).to.equal(USER_NOT_FOUND);

    });

    it('should not get user by invalid id', async () => {
        const response = await userService.getUserById(-7235);

        expect(response === null).to.be.false;

        expect(response.success, 'Expecting success to be false since an invalid (negative) id was sent').to.be.false;

        expect(response.data, 'Expecting data to be null since invalid id was sent').to.be.null;

        expect(response.errorCode, `Expected to see '${USER_INVALID_ID} but got '${response.errorCode}`).to.equal(USER_INVALID_ID);

    });

    it('should return false when user is not admin', async () => {
        logger.info('should return false when user is not admin');

        const user = await User.create({
            email: 'my_own_email@gmail.com',
            password: 'my_pass123',
            username: 'my_username',
        });

        const isAdmin = userService.isAdmin(user);

        logger.info(`User role: ${user.role}. Is admin: ${isAdmin}`);

        expect(isAdmin, 'Expecting new user to have a User role, not Admin').to.be.false;
        
    });

});