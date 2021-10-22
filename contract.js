import { ameegosAddress, ameegosAbi } from './contracts/ameegos.js';
import { web3 } from './wallet.js';

export let address;
export let abi;

if (window?.marketplaceContract?.websiteURL?.includes(window.location.hostname)) {
    address = window.marketplaceContract.address;
    abi = window.marketplaceContract.abi;
} else if (window.location.hostname.includes('ameegos.io')) {
    address = ameegosAddress;
    abi = ameegosAbi;
}

export const contract = new web3.eth.Contract(abi, address);
window.contract = contract;
