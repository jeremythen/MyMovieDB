import dotenv from 'dotenv';
dotenv.config();

const databaseName = process.env.NODE_ENV?.trim() === 'test' ? 'mymoviedb_test' : 'mymoviedb';

export default {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: databaseName,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dbHost: process.env.DB_HOST,
  },
  port: process.env.PORT,
  seqSeeds: process.env.SEQ_SEEDS || 20,
};
