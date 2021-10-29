import { setContracts } from "./contract.js";
import { insertItemLinks } from "./items.js";
import { duplicateItems } from "./collected.js";
import { updateMetamaskStatus } from "./wallet.js";

const init = async () => {
    await updateMetamaskStatus();
    await setContracts();
    insertItemLinks();
    try {
        await duplicateItems();
    } catch (e) {
        console.log(e);
    }
}

init();
