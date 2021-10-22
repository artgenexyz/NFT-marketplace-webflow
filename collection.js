import { contract } from "./contract.js";

const buyItem = (buy_button) => {
    const item = buy_button.parentElement;
    const price = item.getElementsByClassName("price")[0]?.textContent;
    const token_id = item.getElementsByClassName("nft-id")[0]?.textContent;
    console.log(price, token_id)
    contract.methods.buyItem(token_id, 1).send({
        value: Number(price) * 1e18
    }).then((r) => {
        console.log(r);
    })
};

export const insertItemLinks = () => {
    const items = document.getElementsByClassName("buy-button");
    if (items) {
        items.forEach((item) => {
            item.onclick = () => {
                buyItem(item)
            }
        })
    }
}
