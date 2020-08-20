import User from '../db/models/User';
import bcrypt from 'bcrypt';
import { prepareResponse, Response } from '../util/util';
import userRepository from '../repositories/userRepository';
import validator from 'validator';

class UserService {

    async getUsers(): Promise<User[]> {
        return await userRepository.getUsers();
    }

    async registerUser(userPayload: User): Promise<Response> {

        const userRegistrationPayload: User = userPayload;

        const validationResult = validateRegisterUserPayload(
            userRegistrationPayload
        );

        if (!validationResult.valid) {
            return prepareResponse(null, false, 'INVALID_USER_PAYLOAD', validationResult.validationErrors);
        }

        try {

            const userWithEmail = await userRepository.getUserByEmail(userRegistrationPayload.email);

            console.log("userRegistrationPayload.email", userRegistrationPayload.email)
            console.log("userWithEmail", userWithEmail)

            if (userWithEmail !== null) {
                return prepareResponse(null, false, 'USER_EMAIL_EXISTS', ['An account with this email already exists']);
            }

            const userWithUsername = await userRepository.getUserByUsername(userRegistrationPayload.username);

            console.log("userRegistrationPayload.username", userRegistrationPayload.username)
            console.log("userWithUsername", userWithUsername)

            if (userWithUsername !== null) {
                return prepareResponse(null, false, 'USER_USERNAME_EXISTS', ['An account with this username already exists']);
            }

            const user = await userRepository.createUser(userRegistrationPayload);

            return prepareResponse(user, true);

        } catch (e) {
            return prepareResponse(null, false, 'USER_CREATE_ERROR', ['There was an error creating the user', e.message]);
        }
        
    }

    async login(payload: User) {
        const userLoginPayload: User = payload;

        const validationResult = validateLoginUserPayload(userLoginPayload);

        const { username, password } = userLoginPayload;

        if (!validationResult.valid) {
            return prepareResponse(null, false, "INVALID_CREDENTIALS", validationResult.validationErrors);
        }

        const user = await userRepository.getUserByUsername(username);

        if (!user) {
            return prepareResponse(null, false, "USER_NOT_FOUND", [`The specified user with username ${username} was not found`]);
        }

        try {
            if (bcrypt.compareSync(`${password}`, user.getDataValue("password"))) {
                return prepareResponse(user, true);
            } else {
                return prepareResponse(null, false, "INVALID_CREDENTIALS");
            }
        } catch (error) {
            return prepareResponse(null, false, "UNKNOWN_ERROR", ['There was an unknown error. Try again later.']);
        }
    }

}

const userService = Object.freeze(new UserService());

export default userService;


interface ValidationResult {
    valid: boolean;
    validationErrors: string[];
}

/**
 * 
 * @param payload which would be the user register data from request body.
 * This function checks that the required user data to create a new user are present.
 * 
 */
const validateRegisterUserPayload = (payload: User): ValidationResult => {
    const validationResult: ValidationResult = {
        valid: false,
        validationErrors: [],
    };

    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("No user payload was provided");
        return validationResult;
    }

    const { username, email, password } = payload;

    if (username && password && password.length > 5 && validator.isEmail(email)) {
        validationResult.valid = true;
        return validationResult;;
    }

    if (!username) {
        validationResult.validationErrors.push("username is required");
    }

    if (!validator.isEmail(email)) {
        validationResult.validationErrors.push("email is required");
    }

    if (!password) {
        validationResult.validationErrors.push("password is required");
    }

    if (password && password.length < 6) {
        validationResult.validationErrors.push("password minimum length is 6 characters");
    }

    return validationResult;

};

const validateLoginUserPayload = (payload: User): ValidationResult => {

    const validationResult: ValidationResult = {
        valid: false,
        validationErrors: [],
    };

    if (!payload) {
        validationResult.valid = false;
        validationResult.validationErrors.push("No user payload was provided");
        return validationResult;
    }

    const { username, password } = payload;

    if (username && password) {
        validationResult.valid = true;
        return validationResult;
    }

    if (!username) {
        validationResult.validationErrors.push("username is required");
    }

    if (!password) {
        validationResult.validationErrors.push("password is required");
    }

    return validationResult;

}