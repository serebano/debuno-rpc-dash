import type { RequestLocation } from "@utils/RequestLocation.ts";
import type { XURL } from "@xurl";

export function getChanges(oldArray: string[], newArray: string[]): { added: string[]; removed: string[]; } {
    const oldSet = new Set(oldArray);
    const newSet = new Set(newArray);

    const added = newArray.filter(item => !oldSet.has(item));
    const removed = oldArray.filter(item => !newSet.has(item));

    return { added, removed };
}

export function fetchMeta(origin: string | URL): Promise<{ origins: string[]; urls: string[] }> {
    return new Promise((resolve, reject) => {
        const es = new EventSource(new URL(origin).origin)
        es.addEventListener('meta', (e) => {
            const data = JSON.parse(e.data) as { origins: string[]; urls: string[], error?: any }
            console.log('onMeta', data)
            if ('error' in data)
                reject(data)
            else
                resolve(data)

            es.close()
        })
    })
}

export async function fetchMetaOld(
    url: string | URL,
): Promise<{ origins: string[]; urls: string[] }> {
    url = new URL(url);
    const res = await fetch(url.origin);
    const meta = await res.json();

    return meta;
}

export function resolveUrl(url: string | URL | Location | XURL): URL {
    if (!url) return new URL(location.href)
    const href = String(url)

    if (!href.startsWith(location.origin)) {
        if (href.startsWith('http')) {
            url = new URL(href)
            url = new URL('/' + url.host + url.pathname + url.search + url.hash, location.origin)
        } else {
            url = new URL(href.startsWith('/') ? href : './' + href, location.href)
        }
    } else {
        url = new URL(href)
    }

    return url
}

export function getTopUrl(input: string | URL | XURL): URL {
    input = new URL(String(input))
    return location.origin !== input.origin
        ? new URL(location.origin + '/' + input.host + input.pathname + input.search + input.hash)
        : input
}

export function getSubUrl(url: string | URL | Location): URL {
    url = new URL(String(url));

    const protocol = "http:";
    const pathParts = url.pathname.split("/").filter(Boolean);
    const host = pathParts.shift();

    if (host) {
        try {
            const origin = `${protocol}//${host}`;
            const pathname = `/${pathParts.join("/")}`;

            return new URL(origin + pathname + url.search + url.hash);
        } catch (e) {
            console.error(e);
            return new URL(`${protocol}//error`);
        }
    } else {
        return new URL(`${protocol}//index` + url.search + url.hash);
    }
}

export async function fetchCode(url: string | URL): Promise<{ error: string | null, code: string | null }> {
    const request = new Request(url, {
        headers: {
            'x-dest': 'document'
        }
    });

    const response = await fetch(request);
    const filePath = response.headers.get('x-file-path')!

    if (!response.ok) {
        return Promise.reject({
            error: await response.text(),
            code: `/**\n\n\n\t\tError: ${(response.status)}\n\n\t\t${request.url}\n\t\tfile://${filePath}\n\n\t\t${new Date()}\n\n*/`
        })
    }

    return {
        code: `${(await response.text())}\n//# ${request.url}\n//# file://${filePath}`,
        error: null
    }
}

export function replaceImportAndExportPaths(
    sourceCode: string,
    linkMapper: (importPath: string) => string
): string {
    // Regex to match:
    // - Static import/export paths: `import ... from '...'` or `export ... from '...'`
    // - Dynamic import paths: `import('...')`
    const importExportDynamicRegex = /((?:import|export)\s+[^'"]*['"]|import\s*\(['"])([^'"]+)(['"]\s*\)?)/g;

    return sourceCode.replace(importExportDynamicRegex, (_match, before, importPath, after) => {
        const link = linkMapper(importPath);
        return `${before}${link}${after}`;
    });
}

export function replaceImportAndExportPathsWithLinks(
    sourceCode: string,
    linkMapper: (importPath: string) => string
): string {
    // Regex to match:
    // - Static import/export paths: `import ... from '...'` or `export ... from '...'`
    // - Dynamic import paths: `import('...')`
    const importExportDynamicRegex = /((?:import|export)\s+[^'"]*['"]|import\s*\(['"])([^'"]+)(['"]\s*\)?)/g;

    return sourceCode.replace(importExportDynamicRegex, (_match, before, importPath, after) => {
        const link = linkMapper(importPath);
        return `${before}${link}${after}`;
    });
}

export function linkImports(sourceCode: string, loc: RequestLocation, urls: string[]): string {
    // console.log('linkImports/modules', modules)

    const importLink = (specifier: string, url: string) => `&alt;a&asp;class="mod-path&asp;link"&asp;title="Open ${specifier} [Cmd + Click]"&asp;onclick="goto('${url}'); return false;"&agt;${specifier}&alt;/a&agt;`

    return replaceImportAndExportPathsWithLinks(sourceCode, (importPath: string) => {

        const entry = urls.find(module => {
            const importUrl = new URL(importPath, loc.origin)
            return module === importUrl.origin + importUrl.pathname
        })

        if (entry)
            return importLink(importPath, new URL(entry, loc.origin).href);

        return importPath.startsWith('.') || importPath.startsWith(loc.origin)
            ? importLink(importPath, new URL(importPath, loc.url).href)
            : importPath;
    });
}

export async function importFile(url: string, reload: boolean = false) {
    try {
        const _url = reload ? `${url}?${Date.now()}` : url;
        const $mod = url.endsWith('.json')
            ? await import(/* @vite-ignore */ _url, { with: { type: 'json' } })
            : await import(/* @vite-ignore */ _url)
        // @ts-ignore .
        globalThis.$mod = $mod
        console.log(`import(${url}) => $mod`, $mod)
    } catch (cause: any) {
        throw new Error(cause.message);
    }
}