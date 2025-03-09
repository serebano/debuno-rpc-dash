import { computed } from "@preact/signals";
import signals from "@signals";
import type { NavigationState } from "./types.ts";

export default computed<NavigationState>(() => {
    const urls = signals.files.value
    const origin = signals.xurl.origin
    const pathname = signals.xurl.pathname

    const typeParam = signals.xurl.search + signals.xurl.hash
    const currentUrl = origin + pathname + typeParam

    const mapping = urls
        .map((url) => new URL(url))
        .reduce((acc, url) => {
            acc[url.host + url.pathname] = url.origin + url.pathname + typeParam;
            return acc;
        }, {} as Record<string, string>)

    return {
        mapping,
        currentUrl
    }
})