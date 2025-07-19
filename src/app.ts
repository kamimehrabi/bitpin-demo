import express, { Request, Response, NextFunction } from "express";
import AppError from "./utils/AppError";
import currencyRouter from "./routes/currencyRouter";
import globalErrorHandler from "./controllers/errorController";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("json spaces", 2);

app.use("/api/v1/currencies", currencyRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

export default app;
