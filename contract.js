import {AGOS_TOKEN, ALLOWED_NETWORKS, AMEEGOS_ITEMS_CONTRACT, AMEEGOS_NFT_CONTRACT} from './contracts/ameegos.js';
import { getCurrentNetwork, web3 } from './wallet.js';

export let NFTContract;
export let itemsContract;
export let tokenContract;

const initContract = async (contract) => {
    const currentNetwork = await getCurrentNetwork();
    if (!ALLOWED_NETWORKS.includes(currentNetwork)) {
        alert("You're on the wrong network. Please try switching to mainnet or Rinkeby, and refresh the page")
    }
    const address = contract.address[currentNetwork];
    const abi = contract.abi;
    return new web3.eth.Contract(abi, address);
}

const setContracts = async () => {
    NFTContract = await initContract(AMEEGOS_NFT_CONTRACT);
    itemsContract = await initContract(AMEEGOS_ITEMS_CONTRACT);
    tokenContract = await initContract(AGOS_TOKEN);
}

setContracts();
window.NFTContract = NFTContract;
window.itemsContract = itemsContract;
window.tokenContract = tokenContract;
