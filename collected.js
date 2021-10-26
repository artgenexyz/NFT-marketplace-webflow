import { NFTContract } from "./contract.js";
import { getWalletAddress } from "./wallet.js";

const getIPFSUrl = (url) => url.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")

const fetchTokens = async () => {
    const wallet = await getWalletAddress();
    const tx = NFTContract.methods.walletOfOwner(wallet);
    // const tokens = await tx.call();
    const tokens = [1336, 1337, 1338];
    const txUri = (tokenID) => NFTContract.methods.tokenURI(tokenID)
    const tokenURIs = await Promise.all(tokens.map(async (tokenID) => await txUri(tokenID).call()))
    const metadataObjs = await Promise.all(tokenURIs.map(async (url) => await fetch(getIPFSUrl(url)).then(r => r.json())));
    return metadataObjs.map((r) => ({...r, image: getIPFSUrl(r.image) }))
};

export const duplicateItems = async () => {
    const template = document.getElementsByClassName('nft-item')[0]?.parentElement;
    if (!template) {
        console.log("No template element found")
        return
    }
    const nfts = await fetchTokens();
    nfts.forEach((nft) => {
        const clone = template.cloneNode(true);
        clone.classList.remove("hidden");
        const img = clone.getElementsByTagName("img")[0];
        const name = clone.getElementsByClassName("nft-name")[0];
        img.src = nft.image;
        img.srcset = "";
        name.textContent = nft.name;
        template.insertAdjacentElement('afterend', clone);
    })
}
