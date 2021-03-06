import User from '../db/models/User';
import bcrypt from 'bcryptjs';
import { UserCreationAttributes } from '../db/models/User';
class UserRepository {

    async getUsers(): Promise<User[]> {
        return await User.findAll();
    }

    async createUser(userPayload: UserCreationAttributes): Promise<User | null> {

        const {
            username,
            email,
            password,
            firstName = "",
            lastName = "",
        } = userPayload;

        const newUser = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            firstName,
            lastName,
        });

        return newUser;
    }

    async getUserById(userId: number): Promise<User | null> {
        return await User.findOne({ where: { id: userId } });
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return await User.findOne({ where: { username } });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async deleteUser(user: User) {
        return await user.destroy();
    }

}

export default UserRepository;
