import { signal } from "@preact/signals";

export type File = {
    path: string,
    file: string,
    http: string
}

export type FileEvent = File & {
    kind: "any" | "access" | "create" | "modify" | "rename" | "remove" | "other",
}

export type Files = string[]

export default signal<Files>([]);