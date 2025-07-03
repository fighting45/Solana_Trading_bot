import { Raydium, TxVersion, parseTokenAccountResp } from '@raydium-io/raydium-sdk-v2';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';

import bs58 from 'bs58';
import dotenv from 'dotenv';
dotenv.config();
export const owner = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));
export const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=9791f6d5-d58a-46cc-8b4f-1a815c1c6ce6');
export const txVersion = TxVersion.V0;

//setting trade variables
export const desiredPair = 'WSOL/USDC';
export const baseTokenName = 'solana';
export const MARKET_CAP_THRESHOLD = 70000000000;
const ownerPubKey = new PublicKey('4r33xEKAD2cNMrC9NyJy8nb4XmruUKebZ6LZZm65PVUZ');

let raydium;
export const initSdk = async () => {
    raydium = await Raydium.load({
        connection,
        owner,
        cluster: 'mainnet',
        disableFeatureCheck: true,
        disableLoadToken: false,
        blockhashCommitment: 'finalized'
    })
    raydium.setOwner(ownerPubKey)
    return raydium;
}
