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
    let hardcodedGas = undefined;
    if (items.itemType === "0") {
        tx = itemsContract.methods.buyItem(tokenID, 1);
        txData = {
            from: wallet,
            value: price
        }
    } else if (items.itemType === "1") {
        const allowance = await tokenContract.methods.allowance(wallet, itemsContract._address).call()
        
        if (Number(allowance) == 0) {
            const approveTx = tokenContract.methods.approve(itemsContract._address, 1e77); // approx. 2^256 - 1
            const approveTxData = { from: wallet };
            const estimatedGas = await approveTx.estimateGas(approveTxData).catch((e) => {
                buy_button.textContent = initialText;
            })
            await approveTx.send({...approveTxData, gasLimit: estimatedGas + 5000}).catch((e) => {
                buy_button.textContent = initialText;
            })
        }
        
        tx = itemsContract.methods.claimItem(tokenID, 1);
        txData = {
            from: wallet
        }
        hardcodedGas = 100000
    }
    const estimatedGas = hardcodedGas === undefined ? await tx.estimateGas(txData) : hardcodedGas;
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
