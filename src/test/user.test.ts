import { expect } from 'chai';
import userService from '../services/userService';

describe('Users tests', () => {

    it('create user', async () => {
        console.log('env', process.env.NODE_ENV);
        const newUser = await userService.registerUser({
            firstName: 'Jeremy',
            lastName: 'Then',
            email: 'jeremy@gmail.com',
            username: 'jthen',
            password: 'mypass',
        });

        expect(newUser.data.user.username).to.equal('jthen');

    });

});