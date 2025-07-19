# 📁 Currency Data API

A real-time cryptocurrency price and candlestick API using [Bitpin](https://bitpin.ir) WebSocket, built with Node.js + Express + TypeScript.

---

## 🚀 Features

- ✅ Live price streaming from Bitpin WebSocket
- ✅ Real-time candlestick generation (1m to 1M)
- ✅ RESTful API for accessing current prices and OHLC candles
- ✅ In-memory storage (lightweight, fast, no DB)

---

## 📦 Base URL

```
http://localhost:3000/api/v1/currencies
```

---

## 📘 API Endpoints

### 📍 `GET /`

**Description:**\
Returns the list of available currencies from Bitpin REST API.

**Example:**

```
GET /api/v1/currencies/
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC"
    },
    ...
  ]
}
```

---

### 📍 `GET /live`

**Description:**\
Returns the latest price and market data for all available symbols.

**Query Parameters:**

- `symbol` *(optional)*: Filter by specific trading pair, e.g., `BTC_IRT`, `ETH_USDT`, `DOGE_BTC`.

**Examples:**

- All live prices:

  ```
  GET /api/v1/currencies/live
  ```

- A specific symbol:

  ```
  GET /api/v1/currencies/live?symbol=BTC_USDT
  ```

**Response:**

```json
{
  "status": "success",
  "data": {
    "BTC_USDT": {
      "price": 63124.5,
      "timestamp": 1720459887000,
      "daily_change_price": 0.82,
      "low": 62300,
      "high": 63800
    }
  }
}
```

---

### 📍 `GET /candles`

**Description:**\
Returns real-time OHLC candlestick data for a specific symbol and timeframe.

**Query Parameters (required):**

- `symbol`: e.g., `BTC_USDT`
- `tf` (timeframe): `1m`, `5m`, `1h`, `1d`, `1M`

**Example:**

```
GET /api/v1/currencies/candles?symbol=BTC_IRT&tf=1m
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "timestamp": 1720459740000,
      "time": "2025-07-08T13:49:00.000Z",
      "open": 1018000000,
      "high": 1018500000,
      "low": 1017900000,
      "close": 1018300000
    },
    ...
  ]
}
```

---

## ⏱ Timeframes

Supported timeframes for candlesticks:

- `1m` → 1 minute
- `5m` → 5 minutes
- `1h` → 1 hour
- `1d` → 1 day
- `1M` → 1 month

Each candle shows:

- `open`: First price
- `high`: Highest price
- `low`: Lowest price
- `close`: Last price
- `time`: ISO time (UTC)

---

## 📌 Notes

- All live data is fetched from Bitpin WebSocket every 5 seconds.
- No database is used. Data is stored in memory and reset on server restart.
- Time values are in milliseconds since epoch (`timestamp`) and ISO UTC (`time`).

---

## 📫 Postman Collection

A Postman collection is available for quickly testing all routes.

You can import the collection into Postman and test:

- Currency list: `GET /`
- Live prices: `GET /live`
- Candles: `GET /candles?symbol=...&tf=...`

👉 To add it manually: use the base URL `http://localhost:3000/api/v1/currencies` and pass parameters as shown in examples.

Or export your requests from Postman and save a `.json` collection file here.

---

