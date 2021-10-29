import { getAllowedNetworks, AGOS_TOKEN, AMEEGOS_ITEMS_CONTRACT, AMEEGOS_NFT_CONTRACT } from './contracts/ameegos.js';
import { getCurrentNetwork, switchNetwork, web3 } from './wallet.js';

export let NFTContract;
export let itemsContract;
export let tokenContract;

const initContract = async (contract) => {
    if (!window.location.href.includes(contract.allowedURL)) {
        return undefined;
    }
    let currentNetwork = await getCurrentNetwork();
    if (!getAllowedNetworks(contract).includes(currentNetwork)) {
        await switchNetwork(getAllowedNetworks(contract)[0])
        currentNetwork = await getCurrentNetwork();
    }
    const address = contract.address[currentNetwork];
    const abi = contract.abi;
    return new web3.eth.Contract(abi, address);
}

export const setContracts = async () => {
    itemsContract = await initContract(AMEEGOS_ITEMS_CONTRACT);
    tokenContract = await initContract(AGOS_TOKEN);
    NFTContract = await initContract(AMEEGOS_NFT_CONTRACT);
    window.NFTContract = NFTContract;
    window.itemsContract = itemsContract;
    window.tokenContract = tokenContract;
}
