// api/server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = 3000;
const LOG_PATH = path.resolve('db/trade_logs.json');
const CONFIG_PATH = path.resolve('config.json');

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve('./frontend'))); // Serve your index.html

function readLogs() {
    if (!fs.existsSync(LOG_PATH)) return [];
    return JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'));
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./frontend/index.html'));
});

app.get('/token-info', (req, res) => {
    const logs = readLogs();
    const latest = logs[logs.length - 1];
    if (!latest) return res.status(404).json({ error: 'No data yet' });
    res.json({
        symbol: latest.symbol,
        price: latest.price,
        marketcap: latest.marketcap,
        timestamp: latest.timestamp
    });
});

app.get('/buy-orders', (req, res) => {
    res.json(readLogs());
});

app.get('/chart-data', (req, res) => {
    const chartData = readLogs().map(log => ({
        timestamp: log.timestamp,
        price: log.price,
        marketcap: log.marketcap
    }));
    res.json(chartData);
});

// 🔥 Accept frontend POST and start monitoring
app.post('/start-trade', (req, res) => {
    const { pair, baseTokenName } = req.body;

    if (!pair || !baseTokenName) {
        return res.status(400).json({ error: 'Missing pair or baseTokenName' });
    }

    const [base, quote] = pair.split('/');
    const config = {
        desiredPair: pair,
        baseTokenName,
        quoteToken: quote,
        MARKET_CAP_THRESHOLD: 70000000000
    };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    console.log('✅ Config updated. Starting trading bot...');

    const child = spawn('node', ['scripts/executeBuyOrder.js'], {
        stdio: 'inherit'
    });

    return res.json({ status: 'Bot started with updated config', config });
});

app.listen(PORT, () => {
    console.log(`🚀 API server is running at http://localhost:${PORT}`);
});
