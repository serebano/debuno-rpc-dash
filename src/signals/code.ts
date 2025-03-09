import { signal } from "@preact/signals";
import { error } from "@signals";

const code = signal<string>("");

export function setCode(value: { code: string | null, error: string | null }): { code: string | null; error: string | null; } {
    if (value.code) {
        code.value = value.code;
        if (!value.error)
            error.value = ''
    }

    if (value.error)
        error.value = value.error

    return value
}

export default code