import dotenv from 'dotenv';
dotenv.config();

export default {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: 'mymoviedb',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  port: process.env.PORT,
  seqSeeds: process.env.SEQ_SEEDS || 20,
};
