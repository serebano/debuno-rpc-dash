import { computed, signal, batch } from "@preact/signals";
import { getSubUrl, resolveUrl } from "../utils/mod.ts";
import type { XURL } from "./XURL.ts";
import type { XURLSignals } from "./types.ts";

export function setUrl(
    xurl: XURL,
    value: string | URL | Location | XURL,
    state: 'pop' | 'push' = 'push'
) {
    const url = getSubUrl(resolveUrl(value))

    batch(() => {
        xurl.state = state

        xurl.protocol = url.protocol;
        xurl.hostname = url.hostname;
        xurl.pathname = url.pathname;
        xurl.search = url.search;
        xurl.port = url.port;
        xurl.hash = url.hash;
    })

    xurl.state = 'push'
}

export function createURLSignals(init: string | URL | Location): XURLSignals {
    init = getSubUrl(resolveUrl(init))

    const signals: XURLSignals = {
        protocol: signal<string>(init.protocol),
        port: signal<string>(init.port),
        hostname: signal<string>(init.hostname),
        host: computed(() => `${signals.hostname.value}${signals.port.value ? `:${signals.port.value}` : ''}`),
        origin: computed(() => `${signals.protocol.value}//${signals.host.value}`),
        pathname: signal<string>(init.pathname),
        hash: signal<string>(init.hash),
        search: signal<string>(init.search),
        searchParams: computed(() => new URLSearchParams(signals.search.value)),
        href: computed(() => `${signals.origin.value}${signals.pathname.value}${signals.search.value}${signals.hash.value}`),
        state: signal<'push' | 'pop'>('push')
    }

    return signals
}