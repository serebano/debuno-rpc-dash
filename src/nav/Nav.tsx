import "./style.css";
import { TreeView } from "./components/TreeView.tsx";

import { computed } from "@preact/signals";
import { connect } from "@connect";
import { useRef } from "preact/hooks";
import { ScrollContainerContext } from "./scroll-container-context.ts";

const mapping = computed(() => {
  const files = connect.files.value;
  return Object.fromEntries(
    files.map((file) => [file.http, file.http]),
  );
});

export default function Nav() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="nav" ref={containerRef}>
      {/* <NavHeader /> */}
      <ScrollContainerContext.Provider value={containerRef.current}>
        <TreeView
          node={mapping.value}
          parentName=""
          currentUrl={connect.file.value?.http || ""}
          endpoint={connect.file.value?.endpoint!}
        />
      </ScrollContainerContext.Provider>
    </div>
  );
}
