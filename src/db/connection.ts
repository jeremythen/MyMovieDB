import { Sequelize } from 'sequelize';

import envConfig from '../config/envConfig';

const sequelize = new Sequelize('mymoviedb', 'root', process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

export default sequelize;