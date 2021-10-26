import {itemsContract, tokenContract} from "./contract.js";
import { getWalletAddress } from "./wallet.js";

const buyItem = async (buy_button) => {
    const item = buy_button.parentElement;
    const tokenID = item.getElementsByClassName("nft-id")[0]?.textContent;
    const wallet = await getWalletAddress();
    const items = await itemsContract.methods.items(tokenID).call();
    console.log("TOKEN ID", tokenID)
    console.log("ITEMS", items);
    const price = items.price;
    let tx;
    if (items.itemType === "0") {
        tx = itemsContract.methods.buyItem(tokenID, 1);
    } else if (items.itemType === "1") {
        const approveTx = tokenContract.methods.approve(wallet, price);
        const approveTxData = { from: wallet };
        const estimatedGas = await approveTx.estimateGas(approveTxData);
        await approveTx.send({...approveTxData, gasLimit: estimatedGas + 5000})
        tx = itemsContract.methods.claimItem(tokenID, 1);
    }
    const txData = {
        from: wallet,
        value: price
    }
    const estimatedGas = await tx.estimateGas(txData);
    console.log(estimatedGas)
    await tx.send({...txData, gasLimit: estimatedGas + 5000}).then((r) => {
        console.log(r);
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
