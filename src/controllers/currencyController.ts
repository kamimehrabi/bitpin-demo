import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { getLivePrices } from "../services/bitpinSocket";
import { getCandles } from "../services/candleBuilder";

class CurrencyController {
    constructor() {}

    static listCurrencies = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const response = await fetch(
                "https://api.bitpin.org/api/v1/mkt/currencies/",
            );
            if (!response.ok) {
                return next(
                    new AppError("Failed to fetch currencies", response.status),
                );
            }
            const data = await response.json();
            res.status(200).json({
                status: "success",
                data,
            });
        },
    );

    static getLivePrices = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const symbol = req.query.symbol as string | undefined;
            const allPrices = getLivePrices();

            if (symbol) {
                const priceData = allPrices[symbol];

                if (!priceData) {
                    return res.status(404).json({
                        status: "fail",
                        message: `Symbol '${symbol}' not found in live prices.`,
                    });
                }

                return res.status(200).json({
                    status: "success",
                    data: {
                        [symbol]: priceData,
                    },
                });
            }

            res.status(200).json({
                status: "success",
                data: allPrices,
            });
        },
    );

    static getCandles = catchAsync(async (req: Request, res: Response) => {
        const { symbol, tf } = req.query;
        const candles = getCandles(symbol as string, tf as string);
        res.status(200).json({ status: "success", data: candles });
    });
}

export default CurrencyController;
