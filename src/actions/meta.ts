import { files, origins, type Meta } from "@signals";

export function setMeta(value: Meta): void {
    origins.value = value.origins;
    files.value = value.files;
}