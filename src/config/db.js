/* eslint-disable no-console */
/* eslint-disable node/no-process-env */
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql", // atau 'postgres' jika menggunakan PostgreSQL
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  },
);

// Test koneksi
export async function testConnection() {
  try {
    await sequelize.authenticate();

    console.log("Database connection has been established successfully.");
  }
  catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
