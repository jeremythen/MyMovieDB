import mysql from 'mysql';

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "<host>",
  user: "<user>",
  password: "<pass>",
  database: "mymoviedb",
});

export default connection;