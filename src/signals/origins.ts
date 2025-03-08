import { signal } from "@preact/signals";

export type Origin = string
export type Origins = Origin[]

export default signal<Origins>([]);
