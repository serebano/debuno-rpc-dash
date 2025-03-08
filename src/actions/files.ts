import files, { type Files } from "@signals/files.ts";

export function getFiles(): Files {
    return files.value
}

export function setFiles(value: Files) {
    files.value = [...new Set([...files.value, ...value])]
}

export function getOriginFiles(origin: string | URL) {
    origin = new URL(origin).origin
    return files.value.filter(file => file.startsWith(origin))
}

export function removeOriginFiles(origin: string | URL) {
    origin = new URL(origin).origin
    files.value = files.value.filter(file => !file.startsWith(origin))
}

export function removeFile(value: string) {
    files.value = files.value.filter(file => file !== value)
}

export function addFile(value: string) {
    setFiles([value])
}