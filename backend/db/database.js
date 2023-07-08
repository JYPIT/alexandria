import mysql from 'mysql2';
import dotenv from 'dotenv';

// docker test
dotenv.config();

// LOCAL DEV
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PASSWORD,
  database: process.env.REACT_APP_MYSQL_DATABASE,
});

// AWS
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_ROOT_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   port: process.env.MYSQL_PORT,
// });

export const db = pool.promise();
