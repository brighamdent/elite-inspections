import mysql from "mysql2/promise";

let pool: mysql.Pool;

if (!globalThis.__mysqlPool) {
  globalThis.__mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 50,
    connectTimeout: 10000,
    queueLimit: 0,
  });
}

pool = globalThis.__mysqlPool;

export default pool;
