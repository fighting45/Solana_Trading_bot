import fs from 'fs';
import path from 'path';

const LOG_PATH = path.resolve('db/trade_logs.json');

export function logTrade({ symbol, price, marketcap, threshold, action }) {
    const entry = {
        timestamp: new Date().toISOString(),
        symbol,
        price,
        marketcap,
        threshold,
        action,
    };

    let data = [];
    if (fs.existsSync(LOG_PATH)) {
        const fileContent = fs.readFileSync(LOG_PATH, 'utf-8');
        data = JSON.parse(fileContent || '[]');
    }

    data.push(entry);
    fs.writeFileSync(LOG_PATH, JSON.stringify(data, null, 2));
    console.log('📦 Trade logged to DB/trade_logs.json');
}