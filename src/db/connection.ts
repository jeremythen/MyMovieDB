import { Sequelize } from 'sequelize';

import envConfig from '../config/envConfig';

const {
  database: { password, dbHost },
} = envConfig;

const sequelize = new Sequelize('mymoviedb', 'root', password, {
  host: dbHost,
  dialect: 'mysql'
});

export default sequelize;