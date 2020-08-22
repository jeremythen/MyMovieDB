import dotenv from 'dotenv';
dotenv.config();

console.log("process.env.DB_PASSWORD", process.env.DB_PASSWORD)

export default {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dbHost: process.env.DB_HOST,
  },
  port: process.env.PORT,
  seqSeeds: process.env.SEQ_SEEDS || 20,
};
