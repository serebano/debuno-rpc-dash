import { signal } from "@preact/signals";


export const details = signal<Record<string, 'open' | 'close'>>({})