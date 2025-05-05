import { TreeView } from "./TreeView.tsx";
import { getNestedPath, hasSelectedItem, shouldCombinePath } from "../utils.ts";
import type { FolderProps } from "../types.ts";
import DotIcon from "../../icons/DotIcon.tsx";
import { details } from "../state.ts";
import { computed } from "@preact/signals";
import { connect } from "@connect";
import { editFallback } from "@connect/utils.ts";
// import origins from "@signals/origins.ts";

// globalThis.details = details;

const readyStates = computed(() => {
  return Object.fromEntries(
    connect.instances.value.map((i) => [i.endpoint, i.STATE[i.readyState]]),
  );
});

export function Folder(
  { name, node, parentName, endpoint, currentUrl, depth = 0 }: FolderProps,
) {
  const isActive = name === connect.instance.value?.endpoint;
  const isOpen = (depth === 0 && isActive) ||
    hasSelectedItem(node, endpoint, currentUrl, depth);

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
        state={readyStates.value[name] as any}
        size={10}
      />
    </b>
  );

  if (shouldCombinePath(node)) {
    const [displayPath, finalNode, fullPath] = getNestedPath(node, name);
    const key = parentName + fullPath;
    // console.log(" key", key, node);
    const isBase = depth === 0; // origins.peek().includes(key + "/");
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
            {isBase ? dot(key) : ""}
          </summary>
          <TreeView
            node={finalNode}
            parentName={parentName + fullPath}
            endpoint={endpoint}
            currentUrl={currentUrl}
            depth={depth + 1}
          />
        </details>
      </li>
    );
  }

  const key = parentName + name;
  const isBase = depth === 0; //origins.peek().includes(key + "/");
  const d = details.peek();

  return (
    <li data-depth={depth} class={!isBase ? "folder" : "folder_public"}>
      <details
        open={isOpen || d[key] === "open"}
        data-key={key}
        onToggle={onToggle}
      >
        <summary>
          <div
            class={isBase
              ? isActive
                ? "label-container label-container-base label-container-active"
                : "label-container label-container-base"
              : "label-container"}
          >
            <span class="label" title={name}>
              {isBase ? name.split("://").pop() : name}
            </span>
          </div>
          {isBase ? dot(key) : ""}
        </summary>
        {isBase && connect.instance.value?.endpoint === name && (
          <>
            <div class="dirname">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  editFallback(connect.instance.value?.dirname!);
                }}
              >
                {connect.instance.value.dirname}
              </a>
            </div>
          </>
        )}
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
