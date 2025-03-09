import { code, error } from "@signals";

export function setCode(value: { code: string | null, error?: string | null }): { code: string | null; error?: string | null; } {
    if (value.code) {
        code.value = value.code;
        if (!value.error)
            error.value = ''
    }

    if (value.error)
        error.value = value.error

    return value
}