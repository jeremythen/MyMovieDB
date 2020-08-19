import { Sequelize } from 'sequelize';

import envConfig from '../config/envConfig';

const {
  database: { host, password },
} = envConfig;

const sequelize = new Sequelize('mymoviedb', 'root', password, {
  host,
  dialect: 'mysql',
});

export default sequelize;