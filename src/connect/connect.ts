// deno-lint-ignore-file no-explicit-any
import { computed, signal, type Signal } from "@preact/signals"
import { RPCClient, type RPCEvent, type RPCEventListener, type RPCEventNames } from "./RPCClient.ts";
import { RPCFile } from './RPCFile.ts'
import { RPCFiles } from './RPCFiles.ts'
import { debounce } from "./utils.ts";
import config from "@config";
import pages from "../pages/index.ts";

connect.e = new EventTarget
connect.eventNames = [] as string[]
connect.eventListeners = [] as ((event: RPCEvent) => void)[]
connect.offAll = () => {
    connect.onAll = undefined
    for (const listener of connect.eventListeners as any) {
        connect.e.removeEventListener(listener.type, listener.fn)
    }
    connect.eventListeners = []
}
connect.on = (type: RPCEventNames, listener: (event: RPCEvent) => void) => {
    connect.eventNames.push(type)
    const fn = (e: any) => listener(e.data as RPCEvent)
    Object.assign(listener, { fn, type })
    connect.eventListeners.push(listener)
    return type === '*'
        ? (connect.onAll = listener) && (() => connect.onAll = undefined)
        : connect.e.addEventListener(type, fn)
}
connect.off = (type: Exclude<RPCEventNames, '*'>, listener: (event: MessageEvent | Event) => void) => {
    // @ts-ignore .
    const fn = listener.fn
    return connect.e.removeEventListener(type, fn)
}
connect.emit = (type: Exclude<RPCEventNames, '*'>, data?: any) => connect.e.dispatchEvent(data ? new MessageEvent(type, { data }) : new Event(type))
connect.onAll = undefined as ((e: RPCEvent) => void) | undefined

const disposeFuncs = [] as (() => void)[]
connect.disposeFuncs = disposeFuncs

const instances = signal<RPCClient[]>([...RPCClient.instances.values()])

const files = computed(() => {
    let files: RPCFile[] = [];
    for (const instance of instances.value) {
        files = [...files, ...connect.filesMap.get(instance)?.value || []];
    }
    return files
})

const file = signal<RPCFile>()

connect.instances = instances
connect.files = files
connect.file = file
connect.close = RPCClient.close
connect.parse = RPCClient.parse
connect.resolve = RPCClient.resolve
connect.filesMap = new WeakMap<RPCClient, Signal<RPCFile[]>>()
connect.history = signal<string[]>(JSON.parse(localStorage.getItem('endpoints') || '[]'))
connect.url = signal(decodeURIComponent(location.hash.slice(1)))
connect.open = () => Promise.all(connect.instances.value.map((instance) => connect(instance.endpoint).ready))
connect.restore = async (goToLastUrl?: boolean) => {
    const endpoints = connect.history.peek()
    for (const endpoint of endpoints) {
        try { await connect(endpoint).ready } catch (e) {
            console.warn(`{restore error}`, e)
        }
    }
    const hashUrl = decodeURIComponent(location.hash.slice(1))

    try {
        if (goToLastUrl) {
            const lastUrl = localStorage.getItem("rpc:url")
            if (lastUrl) {
                if (hashUrl === lastUrl)
                    await connect(lastUrl).ready
                else
                    location.hash = lastUrl
            }
        } else if (hashUrl) {
            await connect(hashUrl).ready
        }
    } catch (e) {
        console.warn(`{restore lastUrl/error}`, e)

    }
}

connect.instance = computed(() => {
    const url = connect.url.value
    const isPage = url in pages
    if (!isPage)
        return connect(url)
})


const onUrlChange = async (url: string) => {
    const isPage = url in pages
    if (!isPage) {
        const instance = connect(url)
        try {
            await instance.ready
            localStorage.setItem("rpc:url", url);
            if (!instance.filename) {
                file.value = undefined
            }
        } catch (e: any) {
            console.warn(`(onUrlChange) connect(${url}) => failed`, e);
            file.value = {
                error: {
                    inputUrl: url,
                    resolvedUrl: instance.url,
                    message: e.message || e
                }
            } as any
        }
    }
}


connect.init = () => {

    const setHistory = debounce(() => {
        connect.history.value = JSON.parse(
            localStorage.getItem("endpoints") || "[]",
        );
    }, 100);

    connect.on("open", (e) => {
        localStorage.setItem(
            "endpoints",
            JSON.stringify([
                ...new Set([
                    ...JSON.parse(localStorage.getItem("endpoints") || "[]"),
                    e.target.endpoint,
                ]),
            ]),
        );
        setHistory();
    });

    connect.on("close", (e) => {
        const reason = e.data;
        if (reason === "INSTANCE_STOPPED" || reason === "RESOLVE_FAILED") {
            localStorage.setItem(
                "endpoints",
                JSON.stringify(
                    JSON.parse(localStorage.getItem("endpoints") || "[]").filter((
                        value: string,
                    ) => value !== e.target.endpoint),
                ),
            );
            setHistory();
        }
    });

    const onHashChange = () => {
        const currentUrl = decodeURIComponent(location.hash.slice(1))
        if (currentUrl.startsWith(config.protocolHandler.protocol))
            connect.url.value = (currentUrl.split('://').pop()!)
        else
            connect.url.value = (currentUrl)
    }

    addEventListener("hashchange", onHashChange);
    // addEventListener("popstate", onHashChange)
    disposeFuncs.push(
        () => removeEventListener("hashchange", onHashChange),
        // () => removeEventListener("popstate", onHashChange)
    )

    disposeFuncs.push(
        connect.url.subscribe(onUrlChange),
        connect.instances.subscribe(instances => {
            if (!instances.length && !connect.file.value) {
                location.hash = '#'
            }
        })
    )



    connect.disposeFuncs.push(connect.offAll)

    return connect.dispose

}

connect.dispose = () => {
    const fns = disposeFuncs.splice(0, disposeFuncs.length)
    for (const fn of fns) {
        fn()
    }
}

let currentLang: string | undefined

connect.splitView = signal(false)

function connect(input: number | string): RPCClient {
    const instance = new RPCClient(input, {
        onCreated(instance) {
            instance.on('*', (e) => {
                connect.emit(e.type.replace('rpc:', '') as any, e)
                connect.onAll?.(e)
            })

            instance.on('open', (e) => {
                console.debug('   $open', e.target.isRestarting, e.target.endpoint, e.target.STATE[e.target.readyState])

                connect.filesMap.set(instance, signal([]))
                connect.instances.value = [...RPCClient.instances.values()]
            })

            instance.on('error', (e) => {
                console.debug('   $error', e.target.isRestarting, e.target.endpoint, e.target.STATE[e.target.readyState])
                connect.instances.value = [...RPCClient.instances.values()]
            })

            instance.on("restart", (e) => {
                console.debug('   restart', e.target.isRestarting, e.target.endpoint, e.target.STATE[e.target.readyState])
            })

            instance.on("close", (e) => {
                if (e.data === 'INSTANCE_STOPPED' || e.data === 'RESOLVE_FAILED') {
                    RPCClient.instances.delete(instance.endpoint)
                    connect.filesMap.delete(instance)
                }

                connect.instances.value = [...RPCClient.instances.values()]

                if (e.data && connect.file.value?.http?.startsWith(instance.url))
                    connect.file.value = { error: e.data } as any


            });


            instance.on("files", () => {
                const filesSignal = connect.filesMap.get(instance)!
                const filesArray = [...instance.files.values()]

                filesSignal.value = filesArray
            });

            instance.on("endpoints", (e) => {
                const endpoints = e.data
                for (const endpoint of endpoints) {
                    connect(endpoint)
                }
            });

            instance.on('update', () => {
                instances.value = [...RPCClient.instances.values()]
            })

            const fetchFile: RPCEventListener<RPCFile> = async (e) => {
                if (currentLang && (e.data.http.endsWith('.js') || e.data.http.endsWith('.ts') || e.data.http.endsWith('.tsx') || e.data.http.endsWith('.jsx')))
                    e.data.lang = currentLang
                connect.file.value = await e.data.fetch()
            }
            const selectFile: RPCEventListener<RPCFile> = async (e) => {
                const hashUrl = location.hash.slice(1)
                if (hashUrl === e.data.http)
                    await fetchFile(e)
                else
                    location.hash = e.data.http
            }


            instance.on('file:add', selectFile)
            instance.on('file:change', selectFile)
            instance.on('file:select', fetchFile)

            instance.on('file:fetch', e => {
                const file = e.data
                if (file.lang === 'javascript' || file.lang === 'typescript')
                    currentLang = file.lang
            })

            instance.on('file:remove', (e) => {
                const file = e.data
                if (connect.file.value?.http === file.http) {
                    location.hash = file.endpoint;
                }
            })

            instance.on('file:error', e => {
                connect.file.value = e.data
            })


        }
    });
    return instance
}


Object.assign(globalThis, { connect, RPCClient, RPCFile, RPCFiles })

export { connect, RPCClient, RPCFiles, RPCFile }