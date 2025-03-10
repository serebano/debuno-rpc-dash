export type FileEvent = {
    path: string
    file: string
    http: string
    type: "added" | "changed" | "removed"
}

export type Files = string[]

export interface Meta {
    origins: Origins
    files: Files
}


export type Origin = string
export type Origins = Origin[]
