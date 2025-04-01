import type { Signal, ReadonlySignal } from "@preact/signals";
import type { XURL } from "@xurl/XURL.ts";
import type config from "@config";

export type { XURL }
export type XURLDir = typeof config.srcKey | typeof config.genKey
export type XURLExt = 'ts' | 'js'

export interface XURLType {
    status: 'IDLE' | 'LOADING' | 'ERROR' | 'OK',
    base: string;
    protocol: string;
    port: string;
    hostname: string;
    host: string;
    origin: string;
    pathname: string;
    search: string;
    hash: string;
    href: string;
    path: string;
    line: number | undefined;
    column: number | undefined;
    dir: XURLDir;
    ext: XURLExt;
    // state: "pop" | "push"
    searchParams: URLSearchParams;
    params: Record<string, any>
}

export interface XURLSubFunc {
    <P extends keyof XURLType, V extends XURLType[P]>(prop: P, value: V, ctx: XURL): void
}

export type XURLSubMap = {
    [P in keyof XURLType]?: (value: XURLType[P], ctx: XURL) => void;
} & {
    state?: (value: 'push' | 'pop', ctx: XURL) => void
    any?: XURLSubFunc
}

export type ReadonlySignals = 'host' | 'origin' | 'href' | 'searchParams' | 'params' | 'dir' | 'ext'

export type XURLSignals = {
    [P in keyof XURLType]: P extends ReadonlySignals ? ReadonlySignal<XURLType[P]> : Signal<XURLType[P]>;
} & {
    state: Signal<"pop" | "push">
}