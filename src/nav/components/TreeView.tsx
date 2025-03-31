import { File } from "./File.tsx";
import { Folder } from "./Folder.tsx";
import { sortTree } from "../utils.ts";
import type { TreeNode } from "../types.ts";

interface TreeViewProps {
  node: TreeNode;
  parentName: string;
  currentUrl: string;
  endpoint: string;
  depth?: number;
}

export function TreeView(
  { node, parentName, currentUrl, endpoint, depth = 0 }: TreeViewProps,
) {
  const files = Object.keys(node); //.toSorted()

  const tree = files.reduce((acc, file) => {
    const path = file.split("/");
    let current = acc;
    for (const folder of path.slice(0, -1)) {
      if (!current[folder] || typeof current[folder] === "string") {
        current[folder] = {};
      }
      current = current[folder];
    }

    current[path[path.length - 1]] = node[file];
    return acc;
  }, {} as Record<string, any>);

  const sortedNode = sortTree(tree);

  return (
    <ul class="nav">
      {Object.entries(sortedNode).map(([key, value]) => (
        typeof value === "string"
          ? (
            <File
              name={key}
              url={value}
              endpoint={endpoint}
              currentUrl={currentUrl}
            />
          )
          : (
            <Folder
              parentName={parentName}
              name={key}
              node={value}
              endpoint={endpoint}
              currentUrl={currentUrl}
              depth={depth}
            />
          )
      ))}
    </ul>
  );
}
