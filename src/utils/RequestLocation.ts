import config from "../config.ts";
export type RPCRoute = Record<string, any>
export interface RequestLocation {
    get request(): Request;
    url: string;
    origin: string;
    pathname: string;
    hostname: string;
    port: string
    host: string;
    path: string;
    protocol: string;
    typeKey: typeof config.srcKey | typeof config.genKey;
    typeVal: 'ts' | 'js';
    route: RPCRoute;
    namespace: string;
    extension: string;
    contentType: 'application/typescript' | 'application/javascript' | 'application/json' | 'text/html' | 'text/css' | 'text/plain';
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    userAgent: string | null;
    fetchDest: string | null;
    isDocument: boolean;
    isBrowser: boolean;
    isCurl: boolean;
    isNav: boolean;
    isProtocolHandle: boolean;
}

export function getLocation(input: Request, base?: string | RPCRoute): RequestLocation {
    const inputUrl = decodeURIComponent(input.url)
    const isProtocolHandle = inputUrl.includes(config.protocolHandler + ':///')

    const url = isProtocolHandle
        ? new URL(inputUrl.replace(config.protocolHandler + ':///', ''))
        : new URL(inputUrl);

    const pathParts = url.pathname.split('/').filter(Boolean)

    const typeKey = url.searchParams.has(config.srcKey) ? config.srcKey : url.searchParams.has(config.genKey) ? config.genKey : config.srcKey
    const typeVal = (url.searchParams.get(typeKey) || "ts") as 'ts' | 'js'

    const lastPart = pathParts.pop()

    const [
        _fileName,
        lineNumber,
        columnNumber
    ] = lastPart?.split(':') || []

    let namespace = ''
    if (pathParts.length > 0 && pathParts[0].includes(':')) {
        if (pathParts[0].endsWith(':')) {
            namespace = pathParts.shift()?.slice(0, -1) || ''
        } else {
            const [ns, ...rest] = pathParts.shift()?.split(':') || []
            namespace = ns || ''
            if (rest.length) pathParts.unshift(rest.join(':'))
        }
    }


    const contentTypeMap = {
        'ts': 'application/typescript',
        'tsx': 'application/typescript',
        'd.ts': 'application/typescript',
        'js': 'application/javascript',
        'jsx': 'application/javascript',
        'json': 'application/json',
        'map': 'application/json',
        'html': 'text/html',
        'css': 'text/css',
        'txt': 'text/plain',
        'md': 'text/plain',
        'sh': 'text/plain',
        'raw': 'text/plain',
        '': 'text/plain',
    } as const

    const extensions = Object.keys(contentTypeMap)
    const extension = extensions.find(ext => _fileName?.endsWith(ext)) as (keyof typeof contentTypeMap | '')
    // const extension = _fileName?.split('.').pop() as (keyof typeof contentTypeMap | '')
    const fileName = ('/' + pathParts.concat(_fileName).join('/')).replace(/\/{2,}/g, "/")

    let path = ''
    let route = undefined as RPCRoute[string] | undefined
    if (base && typeof base === 'object') {
        route = base[fileName]
        if (route)
            route.type = typeKey
        path = route?.path
    } else {
        path = base?.endsWith(_fileName) ? base : ((base || '') + '/' + fileName).replace(/\/+/g, '/')
    }

    const contentType = contentTypeMap[extension]

    const userAgent = input.headers.get('User-Agent');
    const fetchDest = input.headers.get('x-dest') || input.headers.get('Sec-Fetch-Dest');
    const isNav = input.headers.get('x-nav') === 'true';

    const isDocument = fetchDest === 'document' || fetchDest === 'iframe' || fetchDest === 'embed';
    const isBrowser = !!userAgent?.includes('Chrome') || !!userAgent?.includes('Firefox') || !!userAgent?.includes('Safari');
    const isCurl = !!userAgent?.includes('curl');

    return {
        get request() {
            return input
        },
        url: url.href,
        origin: url.origin,
        pathname: url.pathname,
        hostname: url.hostname,
        port: url.port,
        host: url.host,
        protocol: url.protocol,
        path,
        typeKey,
        typeVal,
        route,
        namespace,
        extension,
        contentType,
        fileName: fileName.slice(1),
        lineNumber: lineNumber ? parseInt(lineNumber) : 1,
        columnNumber: columnNumber ? parseInt(columnNumber) : 1,
        userAgent,
        fetchDest,
        isDocument,
        isBrowser,
        isCurl,
        isNav,
        isProtocolHandle
    }
}