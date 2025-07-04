# 🚀 Solana Trading Bot Dashboard

A full-stack Node.js trading automation bot and visualization dashboard for tracking any Pair on **Raydium Pools** and **market cap**, executing buy orders on **Raydium**, and monitoring thresholds in real-time.

![Frontend Screenshot](./frontend/Screenshot.png)

---

## 🔧 Features

- ✅ Real-time token price & circulating supply fetching via Raydium + CoinGecko
- 🔄 Automated buy order execution when market cap threshold is exceeded
- 📊 API endpoints for token info, trade logs
- 🌐 Interactive frontend dashboard for users
- 🧠 Configurable from the frontend (pair and token input)
- 🧰 Built with Express.js, Node.js, Vanilla JS, HTML, CSS

---

## 📦 API Endpoints

| Method | Route           | Description                            |
|--------|------------------|----------------------------------------|
| GET    | `/`              | Server health check                    |
| GET    | `/token-info`    | Latest token price and market cap      |
| GET    | `/buy-orders`    | History of executed trades             |
| GET    | `/chart-data`    | Simplified data for graphing           |
| POST   | `/start-trade`   | Starts bot based on frontend input     |

---

## 🛠️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-org-name/solana-trading-bot-dashboard.git

cd solana-trading-bot-dashboard

# Install dependencies
npm install

# Start the backend API
node api/server.js

# Open frontend manually
open frontend/index.html
