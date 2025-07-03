
import { connection, initSdk, owner, txVersion } from '../config.js'
import BN from 'bn.js'
import Decimal from 'decimal.js'
import { PublicKey } from '@solana/web3.js'
import { getRaydiumPools } from './trackPrices.js'
import bs58 from "bs58"
import { NATIVE_MINT } from '@solana/spl-token'


// const poolData = await getRaydiumPools();
const poolData = {
    name: 'WSOL/USDC',
    pair_id: 'So11111111111111111111111111111111111111112-EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    lp_mint: 'ArPinjxPiPJMeZpJgJCkguiJws42uefPtHz6QbUS44an',
    official: false,
    liquidity: 8.360946452486395,
    market: 'DowK5fQr3qyRYeRFmGojU7obbh8iEgCzk3967JN1Wc4c',
    volume_24h: 0.4764739733615522,
    volume_24h_quote: 0.48111331863425927,
    fee_24h: 0.0011911849334038803,
    fee_24h_quote: 0.0005564011655960648,
    volume_7d: 8.84016431515591,
    volume_7d_quote: 9.075973166122688,
    fee_7d: 0.02210041078788978,
    fee_7d_quote: 0.01145018445943287,
    price: 148.77759921506993,
    lp_price: 1031.5952533342474,
    amm_id: 'S2MiN5qmiRS8HBQMXcdJUhLwrBgX9P3naDuo4GkQ63t',
    token_amount_coin: 0.02800759,
    token_amount_pc: 4.166902,
    token_amount_lp: 0.008104871,
    apy: 13.74
}

const poolId = poolData.amm_id;

export const swap = async () => {
    const raydium = await initSdk();
    const amountIn = 500;
    const inputMint = NATIVE_MINT.toBase58();
    const poolData = await raydium.api.fetchPoolById({ ids: poolId });

    let poolInfo = poolData[0];
    let poolKeys;
    let rpcData;



    poolKeys = await raydium.liquidity.getAmmPoolKeys(poolId);

    rpcData = await raydium.liquidity.getRpcPoolInfo(poolId);


    const [baseReserve, quoteReserve, status] = [rpcData.baseReserve, rpcData.quoteReserve, rpcData.status.toNumber()];

    if (poolInfo.mintA.address !== inputMint && poolInfo.mintB.address !== inputMint)
        throw new Error('input mint does not match pool')
    const baseIn = inputMint === poolInfo.mintA.address
    const [mintIn, mintOut] = baseIn ? [poolInfo.mintA, poolInfo.mintB] : [poolInfo.mintB, poolInfo.mintA]



    const out = raydium.liquidity.computeAmountOut({
        poolInfo: {
            ...poolInfo,
            baseReserve,
            quoteReserve,
            status,
            version: 4
        },
        amountIn: new BN(amountIn),
        mintIn: mintIn.address,
        mintOut: mintOut.address,
        slippage: 1
    })

    const { transaction } = await raydium.liquidity.swap({
        poolInfo,
        poolKeys,
        amountIn: new BN(amountIn),
        amountOut: out.minAmountOut,
        inputMint: mintIn.address,
        fixedSide: 'in',
        txVersion
    })

    const { blockhash } = await connection.getLatestBlockhash("finalized");
    transaction.message.recentBlockhash = blockhash;
    //Simulation on mainnet
    const sim = await connection.simulateTransaction(transaction);
    console.log('📝 The simulation is completed:', sim);
    if (sim.err) {
        console.error("Simulation failed:", sim);
    }

}
