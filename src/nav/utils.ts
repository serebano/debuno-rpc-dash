// deno-lint-ignore-file no-explicit-any
import type { TreeNode } from './types.ts';

export function sortTree(tree: TreeNode | string): TreeNode | string {
    if (typeof tree !== "object" || tree === null) return tree;

    // Separate entries into folders and files
    const entries = Object.entries(tree);

    const sortedEntries = entries
        .map(([key, value]) => [key, sortTree(value)]) // Recursive sorting
        .sort(([keyA, valueA], [keyB, valueB]) => {
            const isFolderA = typeof valueA === "object";
            const isFolderB = typeof valueB === "object";

            // Folders come first, then alphabetical order
            if (isFolderA !== isFolderB) {
                return isFolderA ? -1 : 1;
            }
            return (keyA as any).localeCompare(keyB as any);
        });

    // Convert back to an object
    return Object.fromEntries(sortedEntries);
}

export function shouldCombinePath(node: TreeNode): boolean {
    if (!node || typeof node !== 'object') return false;
    const entries = Object.entries(node);
    // If there's only one entry and it's not a file
    return entries.length === 1 && typeof entries[0][1] !== 'string';
}

export function getNestedPath(node: TreeNode, basePath: string): [string, TreeNode, string] {
    let current: any = node;
    let path = basePath;
    let _path = basePath;
    while (shouldCombinePath(current)) {
        const [key, value] = Object.entries(current)[0];
        path = path ? `${path}<span class="sep">/</span>${key}` : key;
        _path = _path ? `${_path}/${key}` : key;

        current = value;
    }

    return [path, current, _path];
}

export function fileTypeClass(file: string): string {
    const ext = file.split('.').pop();
    switch (file.toLowerCase()) {
        case 'deno.json':
            return 'deno';
        case 'readme.md':
            return 'readme';
        default:
            switch (ext) {
                case 'md':
                    return 'markdown';
                case 'css':
                    return 'css';
                case 'sh':
                    return 'shell';
                case 'd.ts':
                    return 'dts';
                case 'ts':
                    return 'typescript';
                case 'tsx':
                    return 'tsx';

                case 'js':
                    return 'javascript';
                case 'json':
                    return 'json';
                case 'html':
                    return 'html';
                case 'txt':
                    return 'document';
                default:
                    return 'file';
            }

    }
}

export function hasSelectedItem(node: TreeNode | string, currentUrl: string, depth: number): boolean {
    if (!currentUrl)
        return false;

    if (typeof node === 'string') {
        return currentUrl.startsWith(node) || (depth === 0 && (new URL(currentUrl).pathname === '/' && node.startsWith(currentUrl)))
    }

    return Object.values(node).some(value => hasSelectedItem(value, currentUrl, depth));
}


