import dotenv from 'dotenv';
dotenv.config();

const dialect = process.env.NODE_ENV?.trim() === 'test' ? 'sqlite' : process.env.DB_DIALECT;

console.log('dialect', dialect)

export default {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect,
  },
  port: process.env.PORT,
  seqSeeds: process.env.SEQ_SEEDS || 20,
};
