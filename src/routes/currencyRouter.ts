import express from "express";

import CurrencyController from "../controllers/currencyController";


const router = express.Router();

router.get("/", CurrencyController.listCurrencies);
router.get("/live", CurrencyController.getLivePrices);
router.get("/candles", CurrencyController.getCandles);

export default router;
