import dotenv from 'dotenv';
dotenv.config();
export default {
    database: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        name: process.env.DATABASE,
        host: process.env.HOST,
    },
    port: process.env.PORT,
};
