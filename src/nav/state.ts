import { computed } from "@preact/signals";
// import config from "@lib/config.ts";
import * as $ from "@signals";
import type { NavigationState } from "./types.ts";

export default computed<NavigationState>(() => {
    // const loc = $.loc.value
    const urls = $.files.value
    const origin = $.xurl.origin
    const pathname = $.xurl.pathname

    const typeParam = $.xurl.search + $.xurl.hash
    //  loc.typeKey === config.srcKey && loc.typeVal === "ts" ? ""  : `?${loc.typeKey}=${loc.typeVal}`
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