import { About } from "./about.tsx";
import { History } from "./history.tsx";
import { Install } from "./install.tsx";
import { Welcome } from "./welcome.tsx";

export default {
    "": Welcome,
    "*": () => null,
    "about": About,
    "install": Install,
    "history": History
}