import { Sequelize } from 'sequelize';

import envConfig from '../config/envConfig';

const {
  database: { password, dbHost, databaseName },
} = envConfig;

const DB_HOST = process.env.NODE_ENV === 'docker' ? 'mysqldb' : dbHost; // In case it's running from docker, using the db container name.

const sequelize = new Sequelize(databaseName, 'root', password, {
  dialect: "mysql",
  host: DB_HOST
});

export default sequelize;