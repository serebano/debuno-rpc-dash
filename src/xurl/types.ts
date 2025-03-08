import type { Signal, ReadonlySignal } from "@preact/signals";
import type { XURL } from "./XURL.ts";

export interface XURLType {
    protocol: string;
    port: string;
    hostname: string;
    host: string;
    origin: string;
    pathname: string;
    search: string;
    hash: string;
    href: string;
    // state: "pop" | "push"
    get searchParams(): URLSearchParams;
}

export interface XURLSubFunc {
    <P extends keyof XURLType, V extends XURLType[P]>(prop: P, value: V, ctx: XURL): void
}

export interface XURLSubMap {
    protocol?: (value: string, ctx: XURL) => void;
    port?: (value: string, ctx: XURL) => void;
    hostname?: (value: string, ctx: XURL) => void;
    host?: (value: string, ctx: XURL) => void;
    origin?: (value: string, ctx: XURL) => void;
    pathname?: (value: string, ctx: XURL) => void;
    search?: (value: string, ctx: XURL) => void;
    searchParams?: (value: URLSearchParams, ctx: XURL) => void;
    hash?: (value: string, ctx: XURL) => void;
    href?: (value: string, ctx: XURL) => void;
    state?: (value: 'push' | 'pop', ctx: XURL) => void
    any?: XURLSubFunc
}

export interface XURLSignals {
    protocol: Signal<string>;
    port: Signal<string>;
    hostname: Signal<string>;
    host: ReadonlySignal<string>;
    origin: ReadonlySignal<string>;
    pathname: Signal<string>;
    search: Signal<string>;
    hash: Signal<string>;
    href: ReadonlySignal<string>;
    searchParams: ReadonlySignal<URLSearchParams>;
    state: Signal<"pop" | "push">
}