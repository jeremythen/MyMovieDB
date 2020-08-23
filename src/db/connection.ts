import { Sequelize } from 'sequelize';

import envConfig from '../config/envConfig';

const {
  database: { password, dbHost, databaseName },
} = envConfig;

const sequelize = new Sequelize(databaseName, 'root', password, {
  host: dbHost,
  dialect: 'mysql'
});

export default sequelize;