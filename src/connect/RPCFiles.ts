// deno-lint-ignore-file no-explicit-any
import type { RPCClient } from "./RPCClient.ts";
import { RPCFile } from "./RPCFile.ts";

class RPCFiles extends Map<string, RPCFile> {
    constructor(public client: RPCClient, private hooks: {
        onInit?: (files: RPCFile[], instance: RPCFiles) => void;
        onSet?: (key: string, value: RPCFile, instance: RPCFiles) => void;
        onDelete?: (key: string, instance: RPCFiles) => void;
        onFetch?: (file: RPCFile) => void;
        onClear?: (instance: RPCFiles) => void;
    } = {}) {
        super();
    }

    upsert(key: string, value: RPCFile): this {
        const oldValue = this.get(key)
        const newValue = oldValue
            ? Object.assign(oldValue, value)
            : new RPCFile(value, {
                onFetch: this.hooks.onFetch,
                getFiles: () => this
            })
        super.set(key, newValue);
        this.hooks.onSet?.(key, newValue, this);
        return this;
    }

    override set(key: string, value: RPCFile): this {
        value = new RPCFile(value, {
            onFetch: this.hooks.onFetch,
            getFiles: () => this
        })
        super.set(key, value);
        this.hooks.onSet?.(key, value, this);
        return this;
    }

    override clear() {
        super.clear();
        this.hooks.onClear?.(this);
    }

    override delete(key: string): boolean {
        const result = super.delete(key);
        if (result)
            this.hooks.onDelete?.(key, this);
        return result;
    }

    init(files: RPCFile[]) {
        super.clear();
        files = files.map(file => new RPCFile(file, {
            onFetch: this.hooks.onFetch,
            getFiles: () => this
        }))
        for (const file of files) {
            super.set(file.path, file);
        }
        this.hooks.onInit?.(files, this);
        return this;
    }
}

export { RPCFiles }
