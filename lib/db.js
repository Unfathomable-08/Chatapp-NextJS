import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection; // Store the connection globally

export async function connectDb() {
    if (!connection) { // Create connection only if it doesn't exist
        connection = mysql.createPool({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    return connection;
};