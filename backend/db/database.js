import mysql from 'mysql2';
import dotenv from 'dotenv';

// docker test
dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PASSWORD,
  database: process.env.REACT_APP_MYSQL_DATABASE,
});

export const db = pool.promise();
