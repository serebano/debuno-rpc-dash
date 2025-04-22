import "./style.css";
import { TreeView } from "./components/TreeView.tsx";
import state from "./state.ts";
import NavHeader from "./NavHeader.tsx";
import { endpoint } from "@signals";
import { computed } from "@preact/signals";
import { connect } from "@connect";

const mapping = computed(() => {
  const files = connect.files.value;
  return Object.fromEntries(
    files.map((file) => [file.http.replace("://", ":"), file.http]),
  );
});

export default function Nav() {
  // const { mapping, currentUrl } = state.value;

  return (
    <div id="nav">
      {/* <NavHeader /> */}
      <TreeView
        node={mapping.value}
        parentName="http:/"
        currentUrl={connect.url.value}
        endpoint={endpoint.value!}
      />
    </div>
  );
}
