import { swap } from "./swap.js"
import { calculateMarketCap } from "./trackPrices.js";
import { MARKET_CAP_THRESHOLD } from "../config.js"
import { logTrade } from "./logTrade.js";


export async function monitorAndSwap() {
    const { marketcap, pool } = await calculateMarketCap();
    console.log(`⚠️ Current Solana Market Cap: $${marketcap}`);
    console.log(`🟡 Threshold Maket cap is $${MARKET_CAP_THRESHOLD}`);

    if (marketcap > MARKET_CAP_THRESHOLD) {
        console.log('🟢Threshold exceeded. Executing swap...');
        await swap();
        console.log(`✅Swap executed successfully!`)

        logTrade({
            symbol: 'SOL',
            price: pool.price,
            marketcap: marketcap,
            threshold: MARKET_CAP_THRESHOLD,
            action: 'BUY'
        });

    } else {
        console.log('🚫Threshold not reached. Checking again in 5 minutes.....');
    }
}

// Run every 5 minute
setInterval(monitorAndSwap, 300 * 1000);