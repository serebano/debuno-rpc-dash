import { computed, signal, type Signal } from "@preact/signals";
import { xurl, origins, type FileEvent } from "@signals";
import { addFile, removeFile, setFiles, setError, setCode, removeOrigin, setOrigins } from "@actions";
import { fetchCode } from "@utils";

// export const events = new Map<string, EventSource>()

export const eventSourcesMap = new Map<string, EventSource>()
export const eventSourcesStateMap = new WeakMap<EventSource, Signal<0 | 1 | 2>>()

export const eventSources = computed(() => {
    return origins.value.reduce((acc, origin) => {
        if (eventSourcesMap.has(origin)) {
            acc[origin] = eventSourcesMap.get(origin)!
        } else {
            const es = createEventSource(origin)
            eventSourcesMap.set(origin, es)
            acc[origin] = es
        }
        return acc
    }, {} as Record<string, EventSource>)
})

export const eventSourcesState = computed(() => {
    const obj = eventSources.value
    return Object.keys(obj).reduce((acc, origin) => {
        const signal = eventSourcesStateMap.get(obj[origin])
        if (signal) {
            acc[origin] = getState(signal.value).state
        }
        return acc
    }, {} as Record<string, "OPEN" | "CLOSED" | "CONNECTING">)
})

eventSourcesState.subscribe(val => {
    console.log('eventSourcesState', val)
})

// export const oindex = signal(origins.value.length - 1)
// export const origin = computed(() => origins.value.at(oindex.value))
// export const oevent = computed(() => origin.value ? events.get(origin.value) : undefined)

// export function changeOrigin() {
//     const originsSize = origins.value.length
//     const indexValue = oindex.value

//     console.log(`changeOrigin | idx: ${indexValue} | size: ${originsSize}`)

//     if (originsSize > 0) {
//         if (indexValue < originsSize) {
//             oindex.value = indexValue + 1
//         } else {
//             oindex.value = 0
//         }
//     }
// }

// let prevOrigin = origin.value

// origins.subscribe(o => {
//     console.log(` *  on$origins:`, o)
// })

// origin.subscribe(o => {
//     console.log(` * on$origin:`, o)

//     if (prevOrigin && prevOrigin !== o) {
//         const prevEvSrc = events.get(prevOrigin)
//         if (prevEvSrc) {
//             prevEvSrc.close()
//             events.delete(prevOrigin)
//         }
//     }

//     if (!o) {
//         console.log(` * cannot elect origin`, origins.value.length, 'available')
//         prevOrigin = undefined
//         return;
//     }

//     console.log(' * elected origin:', prevOrigin, ' >> ', o)

//     prevOrigin = o

//     if (!events.has(o))
//         events.set(o, createEventSource(o))
// })


export function getState(readyState: 0 | 1 | 2): { readonly state: "OPEN" | "CLOSED" | "CONNECTING", readonly readyState: number; readonly 1: "OPEN"; readonly 2: "CLOSED"; readonly 0: "CONNECTING"; readonly OPEN: boolean; readonly CLOSED: boolean; readonly CONNECTING: boolean; } {
    const { CLOSED, CONNECTING, OPEN } = EventSource
    const obj = {
        readyState,
        [OPEN]: 'OPEN',
        [CLOSED]: 'CLOSED',
        [CONNECTING]: 'CONNECTING',
        OPEN: readyState === OPEN,
        CLOSED: readyState === CLOSED,
        CONNECTING: readyState === CONNECTING
    } as const

    const state = obj[readyState]

    return {
        ...obj,
        state
    }
}


// export const readyState = signal<0 | 1 | 2>(0)
// export const readyStateMap = computed(() => getState(readyState.value))
// export const readyStateKey = computed(() => readyStateMap.value.state)
// export const host = computed(() => origin.value ? new URL(origin.value).host : null)


export function createEventSource(origin: string): EventSource {
    // origin = new URL(origin).origin

    const es = new EventSource(origin)
    const close = es.close

    es.close = () => {
        close.apply(es)
        setTimeout(() => readyState.value = es.readyState as any, 0)
    }

    const readyState = signal<0 | 1 | 2>(es.readyState as any)
    eventSourcesStateMap.set(es, readyState)

    readyState.subscribe(rs => {
        const state = getState(rs).state

        console.log(`!!readyState:`, origin, state)

        if (state === 'CLOSED') {
            removeOrigin(origin)
            eventSourcesMap.delete(origin)
            eventSourcesStateMap.delete(es)
        }
    })


    es.addEventListener('open', () => {
        readyState.value = es.readyState as any
    })

    es.addEventListener('error', () => {
        readyState.value = es.readyState as any
        // console.log(`   /sse on:error`, origin)
        // removeOrigin(origin)
    })

    es.addEventListener('origins', e => {
        const data = JSON.parse(e.data) as ({ file: string, http: string, base: string }[])
        setOrigins(data.map(v => v.http + v.base))
    })

    es.addEventListener('files', (e) => {
        const data = JSON.parse(e.data) as ({ path: string, file: string, http: string }[] | { error: any })
        if ('error' in data) {
            console.log(` /sse on:files:error`, data)
            setError(data)
        } else {
            setFiles(data.map(v => v.http))
        }

    })

    es.addEventListener('file', (e) => {
        // const id = e.lastEventId
        const data = JSON.parse(e.data) as (FileEvent | { error: any })

        if ('error' in data) {
            console.log(` /sse on:file:error`, data)
            setError(data)
        } else {
            switch (data.type) {
                case 'changed': {
                    if (xurl.origin + xurl.pathname === data.http) {
                        fetchCode(xurl.href)
                            .then(setCode)
                    }
                    break
                }
                case 'removed': {
                    removeFile(data.http)
                    break
                }
                case 'added': {
                    addFile(data.http)
                    xurl.goto(data.http)
                    break
                }
                default: {
                    console.log(`onFile unknown typeevent`, data.type, data.path)
                }
            }
        }

    })

    return es
}
