import { xurl } from "@signals";

export function wrapLines(sourceCode: string): string {
    const lineNumber = xurl.line || 1

    return sourceCode.split("\n").map((str, idx) =>
        `<div data-line=${idx + 1} id="line-${idx + 1}" class="${idx === lineNumber - 1 ? 'selected' : ''}"><span data-line=${idx + 1}>${str
            ? str
                .replaceAll(`<`, `&lt;`)
                .replaceAll(`>`, `&gt;`)
                // .replace(/\t/g, '&nbsp;'.repeat(4)) // tabs to spaces (calculate tab width in browser ctx)
                .replace(/ /g, '&nbsp;')
                .replaceAll(`&alt;`, `<`)
                .replaceAll(`&agt;`, `>`)
                .replaceAll('&asp;', ' ')
            : '<br />'}</span></div>`
    ).join("\n");
}

export function createLineNumbers(sourceCode: string): string {
    const path = xurl.pathname
    const gotoPath = xurl.origin + path
    const lineNumber = xurl.line || 1

    return sourceCode
        .split("\n")
        // .map((_str, idx) => `<a id="lnr-${idx + 1}" title="Go to line ${idx + 1}" onclick='fetch("/open:${path}:${idx === lineNumber - 1 ? [lineNumber, columnNumber].join(':') : idx + 1}"); return false;' class="${idx === lineNumber - 1 ? 'selected' : ''}">${idx + 1}</a>`)
        .map((_str, idx) => `<a id="lnr-${idx + 1}" title="Open ${path}:${idx + 1}" onclick='goto("${gotoPath}:${idx + 1}", ${idx + 1}).open(); return false;' class="${idx === lineNumber - 1 ? 'selected' : ''}">${idx + 1}</a>`)
        .join("\n");
}