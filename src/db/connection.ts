import { Sequelize } from 'sequelize';

import envConfig from '../config/envConfig';

const {
  database: { password, databaseName },
} = envConfig;



const sequelize = new Sequelize(databaseName, 'root', password, {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306
});

export default sequelize;