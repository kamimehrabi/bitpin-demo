interface Candle {
    timestamp: number;
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

const candleStore: Record<string, Record<string, Candle[]>> = {};

const timeframes = {
    "1m": 60_000,
    "5m": 5 * 60_000,
    "1h": 60 * 60_000,
    "1d": 24 * 60 * 60_000,
    "1M": 30 * 24 * 60 * 60_000,
};

export const handleTick = (
    symbol: string,
    priceStr: string,
    timestampFloat: number,
) => {
    const price = parseFloat(priceStr);
    if (isNaN(price)) return;

    const timestampMs = Math.floor(timestampFloat * 1000);

    if (!candleStore[symbol]) candleStore[symbol] = {};

    for (const [tf, interval] of Object.entries(timeframes)) {
        if (!candleStore[symbol][tf]) candleStore[symbol][tf] = [];

        const bucketTime = Math.floor(timestampMs / interval) * interval;
        const candles = candleStore[symbol][tf];
        const last = candles[candles.length - 1];

        if (!last || last.timestamp !== bucketTime) {
            candles.push({
                timestamp: bucketTime,
                time: new Date(bucketTime).toISOString() , 
                open: price,
                high: price,
                low: price,
                close: price,
            });
        } else {
            last.close = price;
            last.high = Math.max(last.high, price);
            last.low = Math.min(last.low, price);
        }

        if (candles.length > 1000) candles.shift();
    }
};

export const getCandles = (symbol: string, tf: string): Candle[] => {
    return candleStore[symbol]?.[tf] || [];
};
