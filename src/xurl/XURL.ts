import { computed, batch, type ReadonlySignal } from "@preact/signals";
import { resolveUrl } from "@utils";
import { createURLSignals, setUrl } from "./utils.ts";
import type { XURLSignals, XURLSubMap, XURLSubFunc, XURLType } from "./types.ts";

export class XURL {
    static signals = new WeakMap<XURL, XURLSignals>()

    static createSignals(instance: XURL, init: string | URL | Location) {
        this.signals.set(instance, createURLSignals(init))
    }

    static getSignals(instance: XURL): XURLSignals | undefined {
        return this.signals.get(instance)
    }

    constructor(init: string | URL | Location)
    constructor(init: string | URL | Location, subMap?: XURLSubMap)
    constructor(init: string | URL | Location, subFunc?: XURLSubFunc)
    constructor(init: string | URL | Location, subInit?: XURLSubMap | XURLSubFunc) {

        XURL.createSignals(this, init)

        this.goto = this.goto.bind(this)

        switch (typeof subInit) {
            case "function":
                this.subscribe(subInit)
                break
            case "object":
                this.subscribe(subInit)
                break
        }

        this.subscribe({
            href(value, xurl) {
                const href = xurl.origin !== location.origin
                    ? resolveUrl(value).href
                    : value

                if (xurl.state === 'push') {
                    history.pushState(null, "", href);
                }
            },
        })

        addEventListener('popstate', () => setUrl(this, location.href, 'pop'))
    }

    goto(input: string | URL | Location) {
        setUrl(this, input, 'push')
    }

    back() {
        globalThis.history.back()
    }

    forward() {
        globalThis.history.forward()
    }

    get #signals() {
        return XURL.signals.get(this)!
    }

    get state(): "pop" | "push" {
        return this.#signals.state.value
    }

    set state(value) {
        this.#signals.state.value = value
    }

    get protocol(): string {
        return this.#signals.protocol.value
    }

    set protocol(value: string) {
        if (typeof value === 'undefined') return
        this.#signals.protocol.value = value.endsWith(':') ? value : `${value}:`;
    }

    get port(): string {
        return this.#signals.port.value;
    }

    set port(value: string) {
        if (typeof value === 'undefined') return
        this.#signals.port.value = value;
    }

    get hostname(): string {
        return this.#signals.hostname.value;
    }

    set hostname(value: string) {
        if (typeof value === 'undefined') return
        this.#signals.hostname.value = value;
    }

    get host(): string {
        return this.#signals.host.value;
    }

    set host(value: string) {
        if (typeof value === 'undefined') return
        batch(() => {
            const [hostname, port] = value.split(':')
            this.hostname = hostname
            this.port = port
        })
    }

    get origin(): string {
        return this.#signals.origin.value;
    }

    get pathname(): string {
        return this.#signals.pathname.value;
    }

    set pathname(value: string) {
        if (typeof value === 'undefined') return
        this.#signals.pathname.value = value.startsWith('/') ? value : `/${value}`;
    }

    get hash(): string {
        return this.#signals.hash.value;
    }

    set hash(value: string) {
        if (typeof value === 'undefined') return
        this.#signals.hash.value = !value || value.startsWith('#') ? value : '#' + value;
    }

    get search(): string {
        return this.#signals.search.value;
    }

    set search(value: string) {
        if (typeof value === 'undefined') return
        this.#signals.search.value = !value || value.startsWith('?') ? value : '?' + value;
    }

    get searchParams(): URLSearchParams {
        return this.#signals.searchParams.value;
    }

    get href(): string {
        return this.#signals.href.value;
    }

    set href(value: string | URL | Location) {
        if (typeof value === 'undefined')
            return

        setUrl(this, value, 'push')
    }

    [Symbol.toPrimitive]() {
        return this.href
    }

    toString(): string {
        return this.href
    }

    valueOf(): this {
        return this
    }

    toJSON(): XURLType {
        return {
            protocol: this.#signals.protocol.peek(),
            host: this.#signals.host.peek(),
            hostname: this.#signals.hostname.peek(),
            port: this.#signals.port.peek(),
            origin: this.#signals.origin.peek(),
            pathname: this.#signals.pathname.peek(),
            search: this.#signals.search.peek(),
            searchParams: this.#signals.searchParams.peek(),
            hash: this.#signals.hash.peek(),
            href: this.#signals.href.peek(),
            // state: this.#signals.state.peek()
        }
    }

    toSignal(): XURLSignals {
        return {
            protocol: this.#signals.protocol,
            port: this.#signals.port,
            hostname: this.#signals.hostname,
            host: this.#signals.host,
            origin: this.#signals.origin,
            pathname: this.#signals.pathname,
            search: this.#signals.search,
            searchParams: this.#signals.searchParams,
            hash: this.#signals.hash,
            href: this.#signals.href,
            state: this.#signals.state
        }
    }

    toURL(): URL {
        return new URL(this.href)
    }

    subscribe<I extends XURLSubMap>(map: I): Record<keyof I, () => void>
    subscribe<I extends XURLSubFunc>(func: I): () => void

    subscribe<I extends XURLSubMap | XURLSubFunc>(input: I): Record<keyof I, () => void> | (() => void) {
        if (typeof input === 'function') {
            const keys = Object.keys(this.toJSON()) as (keyof XURLType)[];
            const res = this.subscribe(keys.reduce((sub, key) => {
                sub[key] = value => input(key, value, this)
                return sub
            }, {} as XURLSubMap))

            return () => {
                for (const key of keys) {
                    res[key]()
                }
            }
        }

        const keys = Object.keys(input) as (keyof I)[];
        const result = {} as Record<keyof I, () => void>
        const $this = this.toSignal()

        return keys.reduce((acc, key) => {
            if (key === 'any') {
                acc[key] = this.subscribe(input.any!)
            } else {
                // @ts-ignore .
                acc[key] = $this[key].subscribe(value => input[key](value, this));
            }
            return acc;
        }, result);
    }

    compute<T>(fn: (xurl: this) => T): ReadonlySignal<T> {
        return computed(() => fn(this))
    }
}