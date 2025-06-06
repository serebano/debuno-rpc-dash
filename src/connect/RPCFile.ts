import type { RPCFiles } from "./RPCFiles.ts";
import { editFallback, parseUrlLike } from "./utils.ts";

interface RPCFile {
    http: string
    base: string
    path: string
    file: string
    lang: string
    version: null | number
    endpoint: string
    timestamp: number
    dependents: Record<string, number | null>
    dependencies: Record<string, number | null>
    type: 'added' | 'removed' | 'changed' | 'selected'
    source?: string
    sources?: {
        original: { path: string, lang: string, contents: string },
        generated?: { path: string, lang: string, contents: string },
    },
    error?: any
}

class RPCFile {
    static from(url: string | URL) {
        return new RPCFile({ http: parseUrlLike(url) } as RPCFile).fetch()
    }

    [Symbol.toStringTag] = `RPCFile(${this.http})`

    onFetch?: (file: RPCFile) => void
    getFiles?: () => RPCFiles

    constructor(file: RPCFile, init?: {
        onFetch?: (file: RPCFile) => void,
        getFiles?: () => RPCFiles
    }) {
        Object.assign(this, file)

        if (init?.onFetch)
            this.onFetch = init.onFetch

        if (init?.getFiles)
            this.getFiles = init.getFiles

        this[Symbol.toStringTag] = `RPCFile(${this.http})`
    }

    importMap(): Record<string, string> | undefined {
        return this.getFiles?.().client.imports
    }

    async open(opts?: { line?: number, column?: number, type?: 'src' | 'gen', format?: 'ts' | 'js' }) {
        opts = opts || {}

        const url = new URL([this.http, opts.line, opts.column].filter(Boolean).join(':'))

        opts.type = opts.type || 'src'
        opts.format = opts.format || 'ts'

        url.searchParams.set(opts.type, opts.format)
        url.searchParams.set('open', '')

        try {
            const res = (await fetch(url, {
                headers: {
                    'x-dest': 'document'
                }
            }))

            if (!res.ok) {
                editFallback(this.file, opts.line, opts.column)
            }
        } catch {
            editFallback(this.file, opts.line, opts.column)
        }
    }

    editFallbak(line?: number, column?: number) {
        return editFallback(this.file, line, column)
    }

    async fetch(init?: (file: this) => Request): Promise<this> {
        const url = new URL(this.http)
        url.searchParams.set('info', '')
        if (this.lang)
            url.searchParams.set('lang', this.lang)

        const response = await fetch(init ? init(this) : url);

        if (response.ok) {
            this.error = undefined;
            Object.assign(this, await response.json());
        } else {
            this.error = {
                status: response.status,
                message: await response.text()
            };
        }
        this.onFetch?.(this)
        return this
    }
}

export { RPCFile }