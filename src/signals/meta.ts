import { computed } from "@preact/signals";
import origins, { type Origins } from "./origins.ts";
import files, { type Files } from "./files.ts";

export interface Meta {
    origins: Origins
    files: Files
}

export default computed<Meta>(() => ({
    origins: origins.value,
    files: files.value
}));

export function setMeta(value: Meta): void {
    origins.value = value.origins;
    files.value = value.files;
}