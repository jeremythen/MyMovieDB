import dotenv from 'dotenv';
dotenv.config();

export default {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  port: process.env.PORT,
  seqSeeds: process.env.SEQ_SEEDS || 20,
};
