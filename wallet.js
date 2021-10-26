export const web3 = window.ethereum ? new Web3(ethereum) : undefined;

const isMetamaskConnected = () => {
    return window.ethereum && ethereum?.selectedAddress !== null;
}

export const getWalletAddress = async (refresh=false) => {
    const currentAddress = async () => {
        if (!window.ethereum) {
            return undefined;
        }
        return ethereum?.selectedAddress ?? await ethereum.request({ method: 'eth_requestAccounts' })[0];
    }
    if (!ethereum?.selectedAddress) {
        await connectMetamask();
        if (refresh) {
            window.location.reload();
        }
    }
    return await currentAddress();
}

export const getCurrentNetwork = async () => {
    return Number(await ethereum.request({ method: 'net_version' }));
}

export const updateMetamaskStatus = () => {
    const connected = isMetamaskConnected()
    if (connected) {
        const button = document.querySelector(window.buttonID ?? '#connect');
        button.textContent = "Metamask connected";
    }
}

export const connectMetamask = async () => {
    const isMobile = /Mobi/i.test(window.navigator.userAgent)
        || /iPhone|iPod|iPad/i.test(navigator.userAgent);
    if (window.ethereum) {
        await ethereum.request({ method: 'eth_requestAccounts' });
        updateMetamaskStatus();
    } else if (isMobile) {
        const link = window.location.href
            .replace("https://", "")
            .replace("www.", "");
        window.open(`https://metamask.app.link/dapp/${link}`);
    }
}

document.querySelector(window.buttonID ?? '#connect').addEventListener('click', connectMetamask);
updateMetamaskStatus();
