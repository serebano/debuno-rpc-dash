import origins, { type Origins } from "@signals/origins.ts";
import { getChanges } from "@utils";
import { removeOriginFiles } from "@actions";
import { xurl } from "@signals";
import X from "https://esm.sh/highlight.js@11.11.1/lib/languages/typescript";

export function getOrigins() {
    return origins.value
}

export function setOrigins(value: Origins) {
    const oldValue = origins.value
    const newValue = value //[...new Set([...oldValue, ...value])]

    const changes = getChanges(oldValue, newValue)
    const hasChanged = changes.added.length || changes.removed.length
    console.log(`changes`, changes)

    if (hasChanged) {
        if (changes.removed) {
            for (const removedOrigin of changes.removed) {
                removeOriginFiles(removedOrigin)
                if (xurl.origin === removedOrigin) {
                    xurl.goto('/index')
                }
            }
        }
    }

    if (hasChanged)
        origins.value = newValue
}

export function removeOrigin(value: string | URL) {
    const origin = new URL(value).origin
    const newOrigins = origins.value.filter(val => val !== origin)
    console.log(`removeOrigin(${origin})`, newOrigins)
    setOrigins(newOrigins)
}