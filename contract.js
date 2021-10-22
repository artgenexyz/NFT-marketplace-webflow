import { ameegosAddress, ameegosAbi } from './contracts/ameegos.js';
import { web3 } from './wallet.js';

export let address;
export let abi;

if (window?.WEBSITE_URL?.includes(window.location.hostname)) {
    address = window.CONTRACT_ADDRESS;
    abi = window.CONTRACT_ABI;
} else if (window.location.hostname.includes('ameegos.io')) {
    address = ameegosAddress;
    abi = ameegosAbi;
}

export let contract = new web3.eth.Contract(abi, address);
