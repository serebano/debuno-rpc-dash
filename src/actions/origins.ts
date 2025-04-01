import { getChanges } from "@utils";
import { removeOriginFiles } from "@actions";
import { xurl, origins, type Origins } from "@signals";
import endpoint from "@signals/endpoint.ts";

export function getOrigins(): Origins {
    return origins.value
}

export function addOrigin(value: string): Origins {
    return setOrigins([...new Set([...getOrigins(), value])])
}

export function setOrigins(value: Origins): Origins {
    const oldValue = origins.value
    const newValue = value

    const changes = getChanges(oldValue, newValue)
    const hasChanged = changes.added.length || changes.removed.length

    if (hasChanged) {
        console.log(`changes`, changes)

        if (changes.removed) {
            for (const removedOrigin of changes.removed) {
                removeOriginFiles(removedOrigin)
                if (endpoint.value === removedOrigin) {
                    xurl.goto('/indexxxx')
                }
            }
        }
    }

    if (hasChanged)
        origins.value = newValue

    return origins.value
}

export function removeOrigin(origin: string | URL): Origins {
    origin = String(origin)
    const newOrigins = origins.value.filter(val => val !== origin)
    console.log(`removeOrigin(${origin})`, newOrigins)
    return setOrigins(newOrigins)
}