import { computed, signal, batch } from "@preact/signals";
import { getSubUrl, resolveUrl } from "@utils";
import type { XURL, XURLExt, XURLSignals } from "@xurl/types.ts";
import config from "@config";


export function parseLocation(url: URL): { url: URL; line?: number; column?: number } {
    // const url = new URL(input, "http://dummy"); // Fallback pentru parsing corect
    const pathMatch = url.pathname.match(/^(.*?):(\d+)?(?::(\d+))?$/);

    if (pathMatch) {
        const [, file, line, column] = pathMatch;
        return {
            url: new URL(url.origin + file + url.search),
            line: line ? parseInt(line, 10) : undefined,
            column: column ? parseInt(column, 10) : undefined,
        };
    }

    return { url };
}

export function setUrl(
    xurl: XURL,
    value: string | URL | Location | XURL,
    state: 'pop' | 'push' = 'push'
) {
    const url = getSubUrl(resolveUrl(value))
    const loc = parseLocation(url)

    batch(() => {
        xurl.state = state

        xurl.protocol = url.protocol;
        xurl.hostname = url.hostname;
        xurl.pathname = loc.url.pathname;
        xurl.search = url.search;
        xurl.port = url.port;
        xurl.hash = url.hash;
        xurl.path = url.pathname;
        xurl.line = loc.line;
        xurl.column = loc.column;
    })

    xurl.state = 'push'
}

export function createURLSignals(init: string | URL | Location): XURLSignals {
    init = getSubUrl(resolveUrl(init))
    console.log('createURLSignals', init)
    const loc = parseLocation(init)
    // init = new URL(loc.url)
    const handle = init.searchParams.get('handle')

    if (handle) {
        try {
            const url = new URL(handle)
            return createURLSignals('http://' + url.host + url.pathname + url.search + url.hash)
        } catch (e: any) {
            throw e
        }
    }

    const signals: XURLSignals = {
        base: signal<string>('/'),
        status: signal('IDLE'),
        protocol: signal<string>(init.protocol),
        port: signal<string>(init.port),
        hostname: signal<string>(init.hostname),
        host: computed(() => `${signals.hostname.value}${signals.port.value ? `:${signals.port.value}` : ''}`),
        origin: computed(() => `${signals.protocol.value}//${signals.host.value}`),
        pathname: signal<string>(loc.url.pathname),
        hash: signal<string>(init.hash),
        search: signal<string>(init.search),
        searchParams: computed(() => new URLSearchParams(signals.search.value)),
        params: computed(() => Object.fromEntries(signals.searchParams.value)),
        href: computed(() => `${signals.origin.value}${signals.path.value}${signals.search.value}${signals.hash.value}`),
        path: signal(init.pathname),
        line: signal(loc.line),
        column: signal(loc.column),
        dir: computed(() => {
            const params = signals.searchParams.value
            const srcKey = config.srcKey
            const outKey = config.genKey
            const defKey = config.srcKey

            return params.has(srcKey) ? srcKey : params.has(outKey) ? outKey : defKey
        }),
        ext: computed(() => {
            const params = signals.searchParams.value

            return (params.get(signals.dir.value) || 'ts') as XURLExt
        }),
        state: signal<'push' | 'pop'>('push')
    }

    return signals
}