import { TreeView } from "./TreeView.tsx";
import { getNestedPath, hasSelectedItem, shouldCombinePath } from "../utils.ts";
import type { FolderProps } from "../types.ts";
import { eventSourcesState } from "@signals/sse.ts";
import DotIcon from "../../icons/DotIcon.tsx";

export function Folder(
  { name, node, currentUrl, depth = 0 }: FolderProps,
) {
  const isOpen = hasSelectedItem(node, currentUrl, depth);

  if (shouldCombinePath(node)) {
    const [displayPath, finalNode, fullPath] = getNestedPath(node, name);
    return (
      <li data-depth={depth} class="folder">
        <details open={isOpen}>
          <summary>
            <div class="label-container">
              <span
                class="label"
                title={fullPath}
                dangerouslySetInnerHTML={{ __html: displayPath }}
              />
            </div>
          </summary>
          <TreeView
            node={finalNode}
            currentUrl={currentUrl}
            depth={depth + 1}
          />
        </details>
      </li>
    );
  }

  const dot = depth === 0
    ? (
      <b
        style={{ position: "absolute", right: "8px", top: "0px", opacity: 0.6 }}
      >
        <DotIcon
          state={eventSourcesState.value[`http://${name}`] ||
            eventSourcesState.value[`https://${name}`]}
          size={10}
        />
      </b>
    )
    : "";

  return (
    <li data-depth={depth} class={depth > 0 ? "folder" : "folder_public"}>
      <details open={isOpen}>
        <summary>
          <div class="label-container">
            <span class="label" title={name}>{name}</span>
          </div>
          {dot}
        </summary>
        <TreeView
          node={node}
          currentUrl={currentUrl}
          depth={depth + 1}
        />
      </details>
    </li>
  );
}
