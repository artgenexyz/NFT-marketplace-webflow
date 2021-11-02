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
    },
    56: {
        name: "Binance Smart Chain Mainnet",
        rpcURL: "https://bsc-dataseed1.binance.org",
        currency: {
          name: "Binance Chain Native Token",
          symbol: "BNB",
          decimals: 18
        },
        blockExplorerURL: "https://bscscan.com",
    },
    97: {
        name: "Binance Smart Chain Testnet",
        rpcURL: "https://data-seed-prebsc-1-s1.binance.org:8545",
        currency: {
          name: "Binance Chain Native Token",
          symbol: "tBNB",
          decimals: 18
        },
        blockExplorerURL: "https://testnet.bscscan.com",
    },
}
