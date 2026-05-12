/* eslint-disable node/no-process-env */
import dotenv from "dotenv";
import app from "./app.js";
import { testConnection } from "./config/db.js";
// import { env } from "./env.js";
import { AverageTable } from "./models/average.js";
import { MachineTable } from "./models/machine.js";
import { MainTable } from "./models/main.js";
import "./models/associations.js";

dotenv.config();

async function startServer() {
  await testConnection();
  await MachineTable.sync({ alter: true });
  await MainTable.sync({ alter: true });
  await AverageTable.sync({ alter: true });

  const server = app.listen(process.env.PORT, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${process.env.PORT}`);
    /* eslint-enable no-console */
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${process.env.PORT} is already in use. Please choose another port or stop the process using it.`);
    }
    else {
      console.error("Failed to start server:", err);
    }
    process.exit(1);
  });
}

startServer();
