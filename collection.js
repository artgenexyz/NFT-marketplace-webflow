import { itemsContract} from "./contract.js";
import { getWalletAddress } from "./wallet.js";

const buyItem = async (buy_button) => {
    const item = buy_button.parentElement;
    const price = item.getElementsByClassName("price")[0]?.textContent;
    const tokenID = item.getElementsByClassName("nft-id")[0]?.textContent;
    const wallet = await getWalletAddress();
    console.log(price, tokenID)
    const tx = itemsContract.methods.buyItem(tokenID, 1);
    const txData = {
        from: wallet,
        value: Number(price) * 1e18
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
        items.forEach((item) => {
            item.onclick = async () => {
                await buyItem(item)
            }
        })
    }
}
