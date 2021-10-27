import {itemsContract, tokenContract} from "./contract.js";
import { getWalletAddress } from "./wallet.js";

const buyItem = async (buy_button) => {
    const initialText = buy_button.textContent;
    buy_button.textContent = "Loading..."
    const item = buy_button.parentElement;
//     const tokenID = 1;
    const tokenID = item.getElementsByClassName("nft-id")[0]?.textContent;
    const wallet = await getWalletAddress();
    const items = await itemsContract.methods.items(tokenID).call();
    console.log("TOKEN ID", tokenID)
    console.log("ITEMS", items);
    const price = items.price;
    let tx;
    let txData;
    if (items.itemType === "0") {
        tx = itemsContract.methods.buyItem(tokenID, 1);
        txData = {
            from: wallet,
            value: price
        }
    } else if (items.itemType === "1") {
        const tokensAvailable = await tokenContract.methods.balanceOf(wallet).call();
        if (Number(tokensAvailable) < price) {
            alert(`Not enough AGOS! You need ${price} AGOS to make this transaction`);
            return
        }

        const allowance = await tokenContract.methods.allowance(wallet, itemsContract._address).call()
        if (Number(allowance) < price) {
            const maxUint = "115792089237316195423570985008687907853269984665640564039457584007913129639935"; // = 2^256 - 1, from https://etherscan.io/tx/0xad66b94f5bae8221c2e862680cdcb9e1ff24183db0579de1618d40892a39ffa4
            const approveTx = tokenContract.methods.approve(itemsContract._address, maxUint);
            const approveTxData = { from: wallet };
            const estimatedGas = await approveTx.estimateGas(approveTxData).catch((e) => {
                buy_button.textContent = initialText;
            })
            await approveTx.send({...approveTxData, gasLimit: estimatedGas + 5000}).catch((e) => {
                buy_button.textContent = initialText;
                if (e.code === 4001) {
                    throw e;
                }
            })
        }
        tx = itemsContract.methods.claimItem(tokenID, 1);
        txData = {
            from: wallet
        }
    }
    const estimatedGas = await tx.estimateGas(txData).catch((e) => {
        buy_button.textContent = initialText;
    });
    console.log(estimatedGas)
    await tx.send({...txData, gasLimit: estimatedGas + 5000}).then((r) => {
        console.log(r);
        buy_button.textContent = initialText;
    }).catch((e) => {
        buy_button.textContent = initialText;
    })
};

export const insertItemLinks = () => {
    const items = document.getElementsByClassName("buy-button");
    if (items) {
        Array.from(items).forEach((item) => {
            item.onclick = async () => {
                await buyItem(item)
            }
        })
    }
}
