import { About } from "./about.tsx";
import { History } from "./history.tsx";
import { Guide } from "./guide.tsx";
import { Welcome } from "./welcome.tsx";

export default {
    "": Welcome,
    "*": () => null,
    "about": About,
    "guide": Guide,
    "history": History
}