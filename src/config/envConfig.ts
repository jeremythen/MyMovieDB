import dotenv from 'dotenv';
dotenv.config();

const databaseName = process.env.NODE_ENV?.trim() === 'test' ? 'mymoviedb_test' : 'mymoviedb';
const DB_HOST = process.env.NODE_ENV === 'docker' ? 'mysqldb' : process.env.DB_HOST; // In case it's running from docker, using the db container name.

export default {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: databaseName,
    host: DB_HOST,
    dialect: 'mysql',
    dbHost: DB_HOST,
  },
  port: process.env.PORT,
  seqSeeds: process.env.SEQ_SEEDS || 20,
};
