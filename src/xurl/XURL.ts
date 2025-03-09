import { computed, batch, type ReadonlySignal } from "@preact/signals";
import { resolveUrl } from "@utils";
import { createURLSignals, parseLocation, setUrl } from "./utils.ts";
import type { XURLSignals, XURLSubMap, XURLSubFunc, XURLType, XURLDir, XURLExt } from "./types.ts";
import config from "@config";

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

    goto(input?: string | URL | Location | null, line?: number | null, column?: number | null): this {
        batch(() => {
            if (input)
                setUrl(this, input, 'push')
            if (line)
                this.line = line
            if (column)
                this.column = column
        })

        console.log(`xurl.goto(${[this, line, column].filter(Boolean).join(', ')})`)

        return this
    }

    location(line?: number | null, column?: number | null): this {
        batch(() => {
            if (line)
                this.line = line
            if (column)
                this.column = column
        })

        return this
    }

    async open() {
        const searchParams = new URLSearchParams(this.search)
        searchParams.set('open', '')
        const openUrl = this.origin + this.path + '?' + searchParams

        console.log(`xurl.open(${this.origin + this.path + this.search})`)

        const res = await fetch(openUrl, {
            headers: {
                'x-dest': 'document'
            }
        })

        if (!res.ok) {
            throw new Error(`Failed to open: ${this} [${res.status}]`)
        }

        console.log([
            res.headers.get('x-file-path'),
            Number(res.headers.get('x-file-line') || 1),
            Number(res.headers.get('x-file-column') || 1)
        ])

        return this
    }

    async import(reload?: boolean) {
        const searchParams = this.searchParams
        if (reload) searchParams.set('reload', Date.now().toString())
        const url = this.origin + this.path + '?' + searchParams

        try {
            const $mod = url.endsWith('.json')
                ? await import(/* @vite-ignore */ url, { with: { type: 'json' } })
                : await import(/* @vite-ignore */ url)
            // @ts-ignore .
            globalThis.$mod = $mod
            console.log(`import(${this}) => $mod`, $mod)
            return $mod

        } catch (cause: any) {
            throw new Error(cause.message);
        }
    }

    get params(): Record<string, any> {
        return this.#signals.params.value
    }

    get dir(): XURLDir {
        return this.#signals.dir.value
    }

    set dir(value) {
        const params = this.searchParams
        params.delete(this.dir)
        params.set(value, this.ext)

        this.search = params.toString()
    }

    get ext(): XURLExt {
        return this.#signals.ext.value
    }

    set ext(value) {
        const params = this.searchParams
        params.set(this.dir, value)

        this.search = params.toString()
    }

    file(dir: XURLDir, ext: XURLExt) {

        batch(() => {
            this.dir = dir
            this.ext = ext
        })

        return this
    }

    back() {
        globalThis.history.back()

        return this
    }

    forward() {
        globalThis.history.forward()

        return this
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
        this.path = value
    }

    get path(): string {
        return this.#signals.path.value
    }

    set path(value: string) {
        if (typeof value === 'undefined') return
        const path = value.startsWith('/') ? value : `/${value}`;
        const { url, line, column } = parseLocation(new URL(path, this.origin))

        batch(() => {
            this.#signals.pathname.value = url.pathname

            this.#signals.path.value = [
                url.pathname,
                line || this.#signals.line.value,
                column || this.#signals.column.value
            ].filter(Boolean).join(':')

            if (line)
                this.#signals.line.value = line
            if (column)
                this.#signals.column.value = column
        })
    }

    get line(): number | undefined {
        return this.#signals.line.value;
    }

    set line(value: number | undefined) {
        batch(() => {
            this.#signals.line.value = value
            this.#signals.path.value = [
                this.pathname,
                value || (this.column ? 1 : undefined),
                this.column
            ].filter(Boolean).join(':')
        })
    }

    get column(): number | undefined {
        return this.#signals.column.value;
    }

    set column(value: number | undefined) {
        batch(() => {
            this.#signals.column.value = value
            this.#signals.path.value = [
                this.pathname,
                this.line,
                this.column
            ].filter(Boolean).join(':')
        })
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
        const exclude = ['state', 'searchParams'];

        return Object.keys(this.#signals)
            .filter(key => !exclude.includes(key))
            .reduce((acc, key) => {
                acc[key as any] = this.#signals[key as keyof XURLSignals].peek()

                return acc
            }, {} as any)
    }

    signals(): XURLSignals {
        return this.#signals
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
        const $this = this.signals()

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