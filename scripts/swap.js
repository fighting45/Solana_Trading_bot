
import { connection, initSdk, owner, txVersion } from '../config.js'
import BN from 'bn.js'
import Decimal from 'decimal.js'
import { PublicKey } from '@solana/web3.js'
import { getRaydiumPools } from './trackPrices.js'
import bs58 from "bs58"
import { NATIVE_MINT } from '@solana/spl-token'


const poolData = await getRaydiumPools();


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
