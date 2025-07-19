import { Sequelize } from "sequelize-typescript";
import BitpSymbol from "../models/BitpSymbol";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "postgres",
        logging: false,
        models: [BitpSymbol],
    },
);
