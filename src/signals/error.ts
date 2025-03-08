import { signal } from "@preact/signals";
import code from "@signals/code.ts";

const error = signal<string>("");

export default error

export function setError(value: { code?: string | null, error: string | null }): { code?: string | null; error: string | null; } {
    error.value = value.error ?? '';
    code.value = value.code ?? (value.error || `Strange Error`)

    return value
}