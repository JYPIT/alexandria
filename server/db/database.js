import mysql from 'mysql2';
import dotenv from 'dotenv';

// docker test
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PASSWORD,
  database: process.env.REACT_APP_MYSQL_DATABASE,
  port: 3306,
});

export const db = pool.promise();
