export type FileEvent = {
    path: string
    file: string
    http: string
    kind: "any" | "access" | "create" | "modify" | "rename" | "remove" | "other"
}

export type Files = string[]

export interface Meta {
    origins: Origins
    files: Files
}


export type Origin = string
export type Origins = Origin[]
