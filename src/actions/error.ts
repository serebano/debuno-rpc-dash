import { code, error } from "@signals";

export function setError(value: { code?: string | null, error: string | null }): { code?: string | null; error: string | null; } {
    error.value = value.error ?? '';
    code.value = value.code ?? (value.error || `Strange Error`)

    return value
}