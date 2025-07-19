import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { connectToBitpin } from "./services/bitpinSocket";

process.on("uncaughtException", (err: Error) => {
    console.log(err.name, err.message);
    console.log("uncaught exception! shutting down...");
    process.exit(1);
});

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`listening to port ${port}...`);
    connectToBitpin();
});

process.on("unhandledRejection", (err: any) => {
    console.log(err.name, err.message);
    console.log("unhandled rejection! shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
