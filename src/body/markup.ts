import hljs from "https://esm.sh/highlight.js@11.11.1/lib/core";
import "./register.ts"

import type { RequestLocation } from "@utils/RequestLocation.ts";
import { linkImports } from "@utils";
import config from "@config";
import { xurl } from "@signals";

function wrapLines(sourceCode: string, loc: RequestLocation): string {
    return sourceCode.split("\n").map((str, idx) =>
        `<div data-line=${idx + 1} id="line-${idx + 1}" class="${idx === loc.lineNumber - 1 ? 'selected' : ''}"><span data-line=${idx + 1}>${str
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

function createLineNumbers(sourceCode: string, { path, lineNumber, columnNumber }: RequestLocation): string {
    const gotoPath = xurl.origin + path
    return sourceCode
        .split("\n")
        // .map((_str, idx) => `<a id="lnr-${idx + 1}" title="Go to line ${idx + 1}" onclick='fetch("/open:${path}:${idx === lineNumber - 1 ? [lineNumber, columnNumber].join(':') : idx + 1}"); return false;' class="${idx === lineNumber - 1 ? 'selected' : ''}">${idx + 1}</a>`)
        .map((_str, idx) => `<a id="lnr-${idx + 1}" title="Open ${path}:${idx + 1}" onclick='goto("${gotoPath}:${idx + 1}", ${idx + 1}).open(); return false;' class="${idx === lineNumber - 1 ? 'selected' : ''}">${idx + 1}</a>`)
        .join("\n");
}

export function markup(reqLoc: RequestLocation, sourceCode: string, urls: string[]): string {

    const highlightedCode = hljs.highlight(sourceCode, {
        language: reqLoc.extension || 'json',
    }).value;

    let codeMask = sourceCode

    codeMask = linkImports(codeMask, reqLoc, urls);
    codeMask = wrapLines(codeMask, reqLoc);

    const linesMask = createLineNumbers(sourceCode, reqLoc);

    const typeKey = reqLoc.typeKey
    const typeVal = reqLoc.typeVal

    const srcKeyLink = reqLoc.origin + reqLoc.pathname + '?' + config.srcKey + "=" + (reqLoc.extension === 'js' ? 'js' : typeVal)
    const outKeyLink = reqLoc.origin + reqLoc.pathname + '?' + config.genKey + "=" + (reqLoc.extension === 'js' ? 'js' : typeVal)

    const tsValLink = reqLoc.origin + reqLoc.pathname + '?' + typeKey + "=ts"
    const jsValLink = reqLoc.origin + reqLoc.pathname + '?' + typeKey + "=js"

    const typeSearchParam = `?${typeKey}=${typeVal}`

    const Dir = `<div class="type-switch">
                    <a class="link ${typeKey === config.srcKey ? "type-selected" : ""}" href="${srcKeyLink}" onclick="xurl.onclick(event)">${config.srcKey}</a>
                    <a class="link ${typeKey === config.genKey ? "type-selected" : ""}" href="${outKeyLink}" onclick="xurl.onclick(event)">${config.genKey}</a>
                </div>`

    const Ext = `<div class="type-switch">
                    <a class="link ${typeVal === 'ts' ? "type-selected" : ""}" href="${tsValLink}" onclick="xurl.onclick(event)">ts</a>
                    <a class="link ${typeVal === 'js' ? "type-selected" : ""}" href="${jsValLink}" onclick="xurl.onclick(event)">js</a>
                </div>`

    const FileSwitch = `<div style="display:flex;gap:10px;">
                ${['ts', 'tsx', 'js', 'jsx'].includes(reqLoc.extension) ? Dir : ''}
                ${['ts', 'tsx'].includes(reqLoc.extension) ? Ext : ''}
            </div>`

    return `
    <div id="preview" class="main">
        <div class="header">

            ${['ts', 'tsx', 'js', 'jsx'].includes(reqLoc.extension) ? FileSwitch : ''}

            <span id="fileName">
                <a class="link" id="current-file" href="${new URL('./' + reqLoc.fileName, reqLoc.url) + typeSearchParam}" style="display:flex;align-items:center;justify-content:center;">
                    ${reqLoc.hostname}:${reqLoc.port}${('/' + reqLoc.fileName).split('/').join(`<span style="opacity:0.5;margin-left: 8px;font-size: 11px;">&#12297;</span>`)}
                </a>
            </span>

            <a href="${reqLoc.origin}/${reqLoc.fileName}" target="_blank">
                open
            </a>

            <a class="link" id="current-href" href="${new URL('./' + [reqLoc.fileName, reqLoc.lineNumber, reqLoc.columnNumber].join(':'), reqLoc.url) + typeSearchParam}">
                <span id="current-line">${reqLoc.lineNumber}</span>:<span id="current-column">${reqLoc.columnNumber}</span>
            </a>

            <span id="log"></span>

            <span style="flex:1"></span>

            <div>
                <a title="Import" onclick="xurl.import()">import()</a>
                <a title="ReImport" onclick="xurl.import(true)">import(r)</a>
            </div>

        </div>
        <div class="wrapper">
            <div class="lines-mask">${linesMask}</div>
            <pre><span class="scroll"><div id="code-editable" contenteditable autofocus onbeforeinput="return false" oncut="return false" onpaste="return false" spellcheck="false" class="code-mask">${codeMask}</div><code class="hljs">${highlightedCode}</code></span></pre>
        </div>
    </div>
    `;
}