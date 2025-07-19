import WebSocket from "ws";
import { handleTick } from "./candleBuilder";

interface TickerData {
    price: number;
    timestamp: number;
    daily_change_price: number;
    low: number;
    high: number;
}

const livePrices: Record<string, TickerData> = {};

export const connectToBitpin = () => {
    const ws = new WebSocket("wss://ws.bitpin.ir");

    ws.on("open", () => {
        console.log("[Bitpin] WebSocket connected");
        ws.send(JSON.stringify({ method: "sub_to_tickers" }));
    });

    ws.on("message", (data) => {
        try {
            const jsonData = JSON.parse(data.toString());

            if (jsonData.event === "tickers_update") {
                const eventTime = jsonData.event_time;

                Object.entries(jsonData).forEach(
                    ([key, value]: [string, any]) => {
                        if (
                            typeof value === "object" &&
                            value.price &&
                            value.timestamp
                        ) {
                            const { price, timestamp } = value;

                            livePrices[key] = {
                                price: parseFloat(price),
                                timestamp: Math.floor(timestamp * 1000),
                                daily_change_price: parseFloat(
                                    value.daily_change_price ?? "0",
                                ),
                                low: parseFloat(value.low ?? price),
                                high: parseFloat(value.high ?? price),
                            };

                            handleTick(key, price, timestamp);
                        }
                    },
                );
            }
        } catch (err) {
            console.error("[Bitpin] Error parsing WebSocket message", err);
        }
    });

    ws.on("error", (err) => {
        console.error("[Bitpin] WebSocket error", err);
    });

    ws.on("close", () => {
        console.warn("[Bitpin] WebSocket closed, reconnecting in 5s...");
        setTimeout(connectToBitpin, 5000);
    });
};

export const getLivePrices = () => livePrices;
