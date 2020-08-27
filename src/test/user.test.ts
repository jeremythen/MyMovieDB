import { expect } from 'chai';
import UserService from '../services/UserService';
import { UserError } from '../util/enums';

const { USER_INVALID_ID, USER_NOT_FOUND } = UserError;

const userService = new UserService();

describe('Users tests', () => {

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

});