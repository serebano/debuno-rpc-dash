// deno-lint-ignore-file no-explicit-any prefer-const
function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: number | undefined;

    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), wait) as unknown as number;
    };
}

function getHeadersSync(url: string): Headers | null {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false); // false makes it synchronous
        xhr.send(null);
        const headers = new Headers();
        xhr.getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/)
            .forEach(line => {
                const parts = line.split(": ");
                const header = parts.shift();
                const value = parts.join(": ");
                if (header) headers.append(header, value);
            });
        return headers;
    } catch {
        // console.error("HEAD request failed:", e);
        return null;
    }
}

// function parseUrlLike(input: string | number): string {
//     const str = String(input).trim();
//     // Handle cases like: https://8080 or http://8080/path
//     const protoPortMatch = str.match(/^https?:\/\/(\d+)(\/.*)?$/);
//     if (protoPortMatch) {
//         const proto = str.startsWith("https") ? "https" : "http";
//         const port = protoPortMatch[1];
//         const path = ensureTrailingSlash(protoPortMatch[2] || "/");
//         return (`${proto}://localhost:${port}${path}`);
//     }
//     // Full valid URL? Parse and normalize
//     try {
//         const url = new URL(str);
//         let port = url.port
//         if (!port) {
//             port = url.protocol === "https:" ? "443" : "80";
//         }
//         const pathname = ensureTrailingSlash(url.pathname);
//         return `${url.protocol}//${url.hostname}:${port}${pathname}`;
//     } catch { }

//     // Manual fallback parsing
//     let protocol = "http";
//     let hostname = "localhost";
//     let port: number | undefined;
//     let path = "/";

//     if (/^\d+$/.test(str)) {
//         port = Number(str);
//     } else if (/^\d+\//.test(str)) {
//         const [p, ...rest] = str.split("/");
//         port = Number(p);
//         path = "/" + rest.join("/");
//     } else if (/^[^/]+:\d+/.test(str)) {
//         const [host, rest] = str.split(":");
//         const [p, ...restPath] = rest.split("/");
//         hostname = host;
//         port = Number(p);
//         path = restPath.length ? "/" + restPath.join("/") : "/";
//     } else if (/^[^/]+\/.*$/.test(str)) {
//         const [host, ...restPath] = str.split("/");
//         hostname = host;
//         path = "/" + restPath.join("/");
//     } else {
//         hostname = str;
//     }

//     path = ensureTrailingSlash(path);
//     if (port === undefined) {
//         port = protocol === "https" ? 443 : 80;
//     }

//     return (`${protocol}://${hostname}:${port}${path}`);
// }

function parseUrlLike(input: string | number | URL): string {
    const str = String(input).trim();
    // console.log("INPUT:", str);

    // Case 1: Full protocol with numeric host (e.g., https://8080/)
    const protoPort = str.match(/^(https?):\/\/(\d+)(\/.*)?$/);
    if (protoPort) {
        const [, proto, port, path] = protoPort;
        return `${proto}://localhost:${port}${ensureSlash(path || "/")}`;
    }

    // Case 2: Handle "8080" or "8080/" as localhost with the port
    if (/^\d+$/.test(str)) {
        const port = str;
        return `http://localhost:${port}/`;
    }

    // Case 3: Handle inputs like "8080/" as localhost with default protocol
    if (/^\d+\//.test(str)) {
        const [port, ...rest] = str.split("/");
        return `http://localhost:${port}/${rest.join("/")}`;
    }

    // Case 4: Try valid URL (force http:// for non-URL inputs)
    try {
        const urlStr = str.match(/^[^:]+(:\d+)?(\/.*)?$/) ? `http://${str}` : str;
        const url = new URL(urlStr);
        const protocol = url.protocol.slice(0, -1); // Remove trailing ":"
        const hostname = url.hostname || "localhost"; // Ensure hostname is not empty
        const port = url.port || (protocol === "https" ? "443" : "80");
        const path = ensureSlash(url.pathname);
        // console.log("VALID URL →", { protocol, hostname, port, path });
        return `${protocol}://${hostname}:${port}${path}`;
    } catch { }

    // Case 5: Manual parsing for other patterns
    let protocol = "http";
    let hostname = "localhost";
    let port: number = 80;
    let path = "/";

    if (/^\d+\//.test(str)) {
        // "8080/foo"
        const [p, ...rest] = str.split("/");
        hostname = "localhost";  // Treat as localhost
        port = Number(p);
        path = "/" + rest.join("/");
    } else if (/^([^/:]+):(\d+)(\/.*)?$/.test(str)) {
        // "host:port" or "host:port/path"
        const [, host, portStr, maybePath] = str.match(/^([^/:]+):(\d+)(\/.*)?$/)!;
        hostname = host;
        port = Number(portStr);
        if (maybePath) path = ensureSlash(maybePath);
    } else if (/^[^/]+\/.+/.test(str)) {
        // "host/path"
        const [host, ...rest] = str.split("/");
        hostname = host;
        path = "/" + rest.join("/");
    } else {
        // Just a hostname
        hostname = str;
    }

    port ||= protocol === "https" ? 443 : 80;
    const final = `${protocol}://${hostname}:${port}${ensureSlash(path)}`;
    // console.log("FALLBACK →", { hostname, port, path, final });
    return final;
}



//   function ensureSlash(path: string = "/"): string {
//     return path.endsWith("/") ? path : path + "/";
//   }





//   function ensureTrailingSlash(path: string): string {
//     return path.endsWith("/") || path.includes("?") || path.includes("#") ? path : path + "/";
//   }

function ensureSlash(path: string): string {
    return path.endsWith("/") ||
        path.includes("?") ||
        path.includes("#") ||
        path.includes('.')
        ? path
        : path + "/";
}

export { parseUrlLike, getHeadersSync, debounce }