import { effect, signal, type Signal } from "@preact/signals";

export class Signals {
    constructor() {
        const signals = new Map<string, Signal<any>>()
        return new Proxy(this, {
            get(target: any, p: any) {
                if (p === '$signals') return signals
                if (p in target) {
                    if (typeof target[p] === 'function')
                        return target[p]
                    if (!signals.has(p))
                        signals.set(p, signal(target[p]))
                    return signals.get(p)?.value
                }
            },
            set(target: any, p: any, newValue) {
                if (p === 'effect') return false
                target[p] = newValue
                if (!signals.has(p))
                    signals.set(p, signal(newValue))
                else
                    signals.get(p)!.value = newValue
                return true
            }
        })
    }
    effect(cb: (o: this) => void) {
        return effect(() => cb(this))
    }
}
