import mysql from 'mysql';

import envConfig from '../config/envConfig';

const {
    database: {
        host,
        name: database,
        user,
        password
    },
} = envConfig;;

const connection = mysql.createPool({
  connectionLimit: 10,
  host,
  user,
  password,
  database,
});

export default connection;