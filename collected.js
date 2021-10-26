import { NFTContract } from "./contract.js";
import { getWalletAddress } from "./wallet.js";

const getIPFSUrl = (url) => url.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")

const fetchTokens = async () => {
    const wallet = await getWalletAddress();
    const tx = NFTContract.methods.walletOfOwner(wallet);
    const tokens = await tx.call();
    const txUri = (tokenID) => NFTContract.methods.tokenURI(tokenID)
    const tokenURIs = tokens.map(async (tokenID) => await txUri(tokenID).call())
    const metadataObjs = tokenURIs.map(async (url) => await fetch(getIPFSUrl(url)).then(r => r.json()));
    return metadataObjs.map((r) => ({...r, image: getIPFSUrl(r.image) }))
};

export const duplicateItems = async () => {
    const template = document.querySelector('#item-template');
    const nfts = await fetchTokens();
    console.log(nfts);
}
