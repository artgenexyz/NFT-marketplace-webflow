export const NETWORKS = {
    1: {
        name: "Ethereum",
        rpcURL: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        blockExplorerURL: "https://etherscan.io"
    },
    4: {
        name: "Rinkeby",
        rpcURL: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        blockExplorerURL: "https://rinkeby.etherscan.io"
    },
    137: {
        name: "Polygon Mainnet",
        rpcURL: "https://polygon-rpc.com/",
        currency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerURL: "https://polygonscan.com/"
    }
}
