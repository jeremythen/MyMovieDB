import dotenv from 'dotenv';
dotenv.config();

const databaseName = process.env.NODE_ENV?.trim() === 'test' ? 'mymoviedb_test' : 'mymoviedb';
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

export default {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: databaseName,
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  port: process.env.PORT,
  seqSeeds: process.env.SEQ_SEEDS || 20,
};
