import { TreeView } from "./TreeView.tsx";
import { getNestedPath, hasSelectedItem, shouldCombinePath } from "../utils.ts";
import type { FolderProps } from "../types.ts";
import { eventSourcesState } from "@signals/sse.ts";
import DotIcon from "../../icons/DotIcon.tsx";
import { details } from "../state.ts";
import origins from "@signals/origins.ts";

// globalThis.details = details;

export function Folder(
  { name, node, parentName, endpoint, currentUrl, depth = 0 }: FolderProps,
) {
  const isOpen = hasSelectedItem(node, endpoint, currentUrl, depth);

  const onToggle = (e: any) => {
    const key = e.target.dataset.key;
    const { newState, oldState } = e;

    details.value[key] = newState;

    // console.log(
    //   "onToggle",
    //   { key, newState, oldState },
    // );
  };

  const dot = (name: string) => (
    <b
      style={{
        position: "absolute",
        right: "10px",
        top: "0px",
        opacity: 0.7,
      }}
    >
      <DotIcon
        state={eventSourcesState.value[name]}
        size={10}
      />
    </b>
  );

  if (depth > 0 && shouldCombinePath(node)) {
    const [displayPath, finalNode, fullPath] = getNestedPath(node, name);
    const key = parentName + "/" + fullPath;
    const isBase = origins.peek().includes(key + "/");
    const d = details.peek();

    return (
      <li data-depth={depth} class={!isBase ? "folder" : "folder_public"}>
        <details
          open={isOpen || d[key] === "open"}
          data-key={key}
          onToggle={onToggle}
        >
          <summary>
            <div class="label-container">
              <span
                class="label"
                title={fullPath}
                dangerouslySetInnerHTML={{ __html: displayPath }}
              />
            </div>
            {isBase ? dot(key + "/") : ""}
          </summary>
          <TreeView
            node={finalNode}
            parentName={parentName + "/" + fullPath}
            endpoint={endpoint}
            currentUrl={currentUrl}
            depth={depth + 1}
          />
        </details>
      </li>
    );
  }

  const key = parentName + "/" + name;
  const isBase = origins.peek().includes(key + "/");
  const d = details.peek();

  return (
    <li data-depth={depth} class={!isBase ? "folder" : "folder_public"}>
      <details
        open={isOpen || d[key] === "open"}
        data-key={key}
        onToggle={onToggle}
      >
        <summary>
          <div class="label-container">
            <span class="label" title={name}>{name}</span>
          </div>
          {isBase ? dot(key + "/") : ""}
        </summary>
        <TreeView
          node={node}
          parentName={parentName + "/" + name}
          endpoint={endpoint}
          currentUrl={currentUrl}
          depth={depth + 1}
        />
      </details>
    </li>
  );
}
