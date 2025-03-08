// deno-lint-ignore-file no-window
import type { RequestLocation } from "@lib/RequestLocation.ts";
import { importFile, linkImports, replaceImportAndExportPathsWithLinks } from "../utils/mod.ts";

export function script(loc: RequestLocation) {
    const funcs = [
        importFile,
        linkImports,
        replaceImportAndExportPathsWithLinks
    ];

    return `<script>${funcs.join(';\n\n')};(${init})(${JSON.stringify(loc)});</script>`;
}

export function init(reqLoc: RequestLocation, init: boolean = false) {

    const __api__ = {
        ...reqLoc,
        pos,
        goToPos,
        setPos,
        setTabSize,
        editor: null as Element | null,
        tabSize: 0
    };

    Object.assign(globalThis, { __api__, _preview: init });

    function setTabSize(size: number) {
        document.body.style.tabSize = String(size);
        __api__.tabSize = calculateTabSize();
    }

    function pos(lineNumber?: number, columnNumber?: number) {
        if (lineNumber || columnNumber) {
            __api__.lineNumber = lineNumber || __api__.lineNumber;
            __api__.columnNumber = columnNumber || __api__.columnNumber;
        }
        log(`Pos(${__api__.lineNumber}, ${__api__.columnNumber})`);
        __api__.goToPos(__api__.lineNumber, __api__.columnNumber);
        __api__.setPos(__api__);

    }

    function log(...args: any[]) {
        if (args.length) console.log(...args);
        const el = document.getElementById('log');
        if (!el) return;
        el.innerText = args.length ? args.join(', ') : '';
    }

    function goToPos(line: number, column: number) {
        const editor = __api__.editor!;
        const targetLine = editor.querySelector(`[data-line="${line}"]`);

        if (!targetLine) {
            log("Line number out of range!");
            return;
        }

        const textSpan = targetLine.querySelector("span");
        if (!textSpan) {
            log("No text found in the target line!");
            return;
        }

        const walker = document.createTreeWalker(
            textSpan,
            NodeFilter.SHOW_TEXT,
            null
        );
        let offset = column - 1;
        let currentNode = null;

        // Traverse the text nodes to find the correct position
        while (walker.nextNode()) {
            const node = walker.currentNode as any;
            if (offset <= node.length) {
                currentNode = node;
                break;
            }
            offset -= node.length;
        }

        if (currentNode) {
            // Set the cursor position
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(currentNode, offset);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        } else {
            log("Column number out of range!");
        }
    }

    function setPos(res: RequestLocation) {
        document.querySelector('.code-mask .selected')?.setAttribute('class', '');
        document.querySelector(`.code-mask #line-${res.lineNumber}`)?.setAttribute('class', 'selected');

        document.querySelector('.lines-mask .selected')?.setAttribute('class', '');
        document.querySelector(`.lines-mask #lnr-${res.lineNumber}`)?.setAttribute('class', 'selected');

        document.getElementById("current-line")!.textContent = String(res.lineNumber);
        document.getElementById("current-column")!.textContent = String(res.columnNumber);
        document.getElementById("current-href")!.setAttribute("href", new URL('./' + [reqLoc.fileName, res.lineNumber, res.columnNumber].join(':'), reqLoc.url).href);
    }

    function updateCursorPosition(e: any) {
        const selection = window.getSelection()!;
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

        const isCmdClick = e.type === 'click' && e.metaKey === true;
        const isDblClick = e.type === 'dblclick';
        // log(e.type, isCmdClick, isDblClick)
        if (selection?.toString()) return;

        if (!range) {
            return;
        }

        const selectedNode: any = __api__.editor === range?.startContainer.parentNode
            ? selection?.anchorNode
            : range?.startContainer.parentNode;


        if (!selectedNode) {
            log('no selected node');
        }

        if (isCmdClick && selectedNode.className.includes('mod-path')) {
            const u = new URL(selectedNode.href)
            const o = u.origin + u.pathname + location.search
            // log('mod-path', selectedNode.href, o);
            // @ts-ignore .
            if (globalThis.goto) globalThis.goto?.(o);
            else document.location.assign(o);
            return;
        }

        let container = range.startContainer;

        // If the container is a Text node, use its parent Element
        if (container.nodeType === Node.TEXT_NODE) {
            container = container.parentElement!;
        }

        // Ensure the container is an Element before calling closest
        const lineElement = (container as HTMLElement).closest("div[data-line]");

        if (lineElement) {
            const line = parseInt(lineElement.getAttribute("data-line")!, 10);
            const span = lineElement.querySelector("span");

            if (!span) {
                log("No span element found for line", line);
                return;
            }

            let column = 1;
            const walker = document.createTreeWalker(
                span,
                NodeFilter.SHOW_TEXT,
                null
            );
            // let currentNode = null;
            while (walker.nextNode()) {
                const node = walker.currentNode as any;
                // console.log(column, node);
                if (node === range.startContainer) {
                    column += range.startOffset;
                    // log("range.startContainer", column, range.startOffset);
                    break;
                } else {
                    column += node.length;
                    // log("else node.length", column, node.length);
                }
            }

            __api__.lineNumber = line;
            __api__.columnNumber = column;

            if (isCmdClick || isDblClick) {
                const url = `${__api__.origin}/open:${__api__.path}:${__api__.lineNumber}:${__api__.columnNumber}`
                console.log(url);
                fetch(url).then(res => {
                    console.log(`open res`, res.status)
                })
            }

            setPos(__api__);
        }
    }

    const scrollSelectionIntoView = () => {
        // Get current selection
        const selection = window.getSelection();

        // Check if there are selection ranges
        if (!selection?.rangeCount) {
            return;
        }

        // Get the first selection range. There's almost never can be more (instead of firefox)
        const firstRange = selection.getRangeAt(0);

        // Sometimes if the editable element is getting removed from the dom you may get a HierarchyRequest error in safari
        if (firstRange.commonAncestorContainer === document) {
            return;
        }

        // Create an empty br that will be used as an anchor for scroll, because it's imposible to do it with just text nodes
        const tempAnchorEl = document.createElement('span');

        // Put the br right after the caret position
        firstRange.insertNode(tempAnchorEl);

        // Scroll to the br. I personally prefer to add the block end option, but if you want to use 'start' instead just replace br to span
        tempAnchorEl.scrollIntoView({
            block: 'end',
        });

        // Remove the anchor because it's not needed anymore
        tempAnchorEl.remove();
    };

    function calculateTabSize() {
        const container = document.createElement('div');
        container.style.fontFamily = 'monospace';
        container.style.whiteSpace = 'pre';
        container.style.position = 'absolute';
        container.style.visibility = 'hidden';
        document.body.appendChild(container);
        container.textContent = '\s';
        const spaceWidth = container.offsetWidth;
        container.textContent = '\t';
        const tabWidth = container.offsetWidth;
        const tabSize = Math.round(tabWidth / spaceWidth);
        container.remove();
        return tabSize;
    }

    function initPreview(_reqLoc?: RequestLocation) {
        if (_reqLoc)
            reqLoc = _reqLoc;

        const editor = __api__.editor = document.querySelector('[contenteditable]');

        if (!editor)
            return;

        __api__.tabSize = calculateTabSize();
        editor.innerHTML = editor?.getHTML().replace(/\t/g, '&nbsp;'.repeat(__api__.tabSize));

        __api__.goToPos(reqLoc.lineNumber, reqLoc.columnNumber);
        __api__.setPos(reqLoc);
        // @ts-ignore .
        document.querySelector('li.selected')?.scrollIntoViewIfNeeded();
        scrollSelectionIntoView();

        editor.addEventListener('click', updateCursorPosition);
        editor.addEventListener('dblclick', updateCursorPosition);
        editor.addEventListener('keydown', updateCursorPosition);
        editor.addEventListener("keyup", updateCursorPosition);
        // editor.addEventListener("mouseup", updateCursorPosition);
        editor.addEventListener("focus", updateCursorPosition);
        editor.addEventListener('mousedown', function (event: any) {
            if (event.detail > 1)
                event.preventDefault();
        }, false);

        function setDetailsOpen(element: HTMLElement & { open: boolean, prev: boolean }, value: boolean = true) {
            // Traverse up the parent elements and open all <details> ancestors
            while (element.parentElement) {
                element = element.parentElement as any;
                if (element.tagName.toLowerCase() === 'details') {
                    // element.setAttribute('open', String(value))
                    const prev = element.open
                    element.open = value === false ? element.prev : value;
                    element.prev = prev
                    // console.log('setDetailsOpen', element, value)
                }
            }
        }

        function setSelected(element: HTMLElement | null, selected: boolean = true) {
            if (!element) return;
            // document.querySelectorAll('ul.import-map-tree li').forEach(li => li.classList.remove('selected', 'code-hint'))

            setDetailsOpen(element as any, selected);

            while (element.parentElement) {
                element = element.parentElement;
                if (element.tagName.toLowerCase() === 'li') {
                    element.classList.toggle('code-hint', selected);
                    // @ts-ignore .
                    if (selected) element.scrollIntoViewIfNeeded()
                    break
                }
            }
        }

        editor.querySelectorAll('a.mod-path').forEach(_e => {
            const e = _e.parentElement!
            // console.log('a.mod-path', e)

            e.addEventListener('mouseenter', e => {
                // @ts-ignore .
                const href = e.target.querySelector('a.mod-path').href
                setSelected(document.querySelector(`ul.import-map-tree a[href="${href}"]`));
            });

            e.addEventListener('mouseleave', e => {
                // @ts-ignore .
                const href = e.target.querySelector('a.mod-path').href
                setSelected(document.querySelector(`ul.import-map-tree a[href="${href}"]`), false);
            });
        });
    }

    Object.assign(globalThis, { initPreview });

    if (init) {
        initPreview()
    } else {
        document.addEventListener('DOMContentLoaded', () => initPreview());
    }
}
