import { sequelize } from "./db";
import "reflect-metadata";
// import { BitpSymbol } from "./models/BitpSymbol";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { connectToBitpin } from "./services/bitpinSocket";

dotenv.config({ path: "./config.env" });

async function bootstrap() {
  try {
    // 1) Connect to Postgres
    await sequelize.authenticate();
    console.log("🚀 PostgreSQL connected.");

    // 2) Sync your new table (for prod you may want migrations instead)
    await sequelize.sync({ alter: true });
    console.log("🔄 All models were synchronized successfully.");

    // 3) Continue with the rest of your startup
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`listening on port ${port}...`);
      connectToBitpin();
    });

    process.on("unhandledRejection", (err: any) => {
      console.error(err.name, err.message);
      console.log("unhandled rejection! shutting down...");
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error("❌ Failed to start:", err);
    process.exit(1);
  }
}

// catch uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error(err.name, err.message);
  console.log("uncaught exception! shutting down...");
  process.exit(1);
});

bootstrap();
