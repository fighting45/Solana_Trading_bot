# Web3 Trading Bot Frontend

A minimal frontend dashboard to interact with your Solana trading bot API.

## Features

- **Health Check**: Test if your backend server is running
- **Token Info**: Get latest SOL price and market cap data
- **Buy Orders History**: View all executed trades
- **Chart Data**: Get formatted data for visualization
- **Server Status**: Real-time server connectivity indicator
- **Beautiful UI**: Modern, responsive design with gradient colors

## How to Use

1. **Start your backend server first**:
   ```bash
   cd "My Intern web3 Project"
   node api/server.js
   ```

2. **Open the frontend**:
   - Simply open `frontend/index.html` in your web browser
   - Or use a local server like Live Server extension in VS Code

3. **Interact with your API**:
   - Click any of the colorful buttons to call your API endpoints
   - View responses in the large display area below
   - Watch the server status indicator (green = online, red = offline)

## API Endpoints Available

| Button | Endpoint | Description |
|--------|----------|-------------|
| 🏥 Health Check | `GET /` | Check if server is running |
| 💰 Token Info | `GET /token-info` | Latest SOL price & market cap |
| 📈 Buy Orders History | `GET /buy-orders` | All executed trades |
| 📊 Chart Data | `GET /chart-data` | Data formatted for charts |

## No Backend Changes

This frontend doesn't modify any of your existing backend code - it simply provides a visual interface to test and interact with your existing API endpoints. 