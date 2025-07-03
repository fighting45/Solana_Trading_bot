import { desiredPair, baseTokenName } from '../config.js';
import fetch from 'node-fetch';

const [baseToken, quoteToken] = desiredPair.split('/')

export async function getRaydiumPools() {
    try {

        const response = await fetch('https://api.raydium.io/pairs');
        const data = await response.json();
        const poolData = data.find(pool => pool.name.toUpperCase() === desiredPair.toUpperCase());

        if (!poolData) {

            console.log('Pool couldnt be found')
            return;

        }

        return (poolData);

    }
    catch (err) {
        console.error('Failed to load data', err)
        return;
    }
}
export async function calculateMarketCap() {

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${baseTokenName}`);

    if (!res.ok) {
        console.log(`CoinGecko api failed to fetch ${baseTokenName} information!`)
        return;
    }
    const data = await res.json();
    const poolObj = await getRaydiumPools();
    const price = poolObj.price;
    const supply = data.market_data.circulating_supply;
    console.log(`➡️ Current ${baseToken} price in ${quoteToken} is: "${poolObj.price}"`);
    console.log(`➡️ The circulating supply of ${baseTokenName} is: "${supply}"`);
    const marketCap = supply * poolObj.price;
    console.log(`➡️ Current marketcap of ${baseToken} is: "${marketCap}"`);
    return {
        marketcap: marketCap,
        pool: {

            ...poolObj,
            price
        }
    };
}
// calculateMarketCap();

