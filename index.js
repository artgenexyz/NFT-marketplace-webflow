import {setContracts} from "./contract.js";
import { insertItemLinks } from "./items.js";
import { duplicateItems } from "./collected.js";

const init = async () => {
    await setContracts();
    insertItemLinks();
    try {
        await duplicateItems();
    } catch (e) {
        console.log(e);
    }
}

init();
