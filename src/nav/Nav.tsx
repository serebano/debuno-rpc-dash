import "./style.css";
import { TreeView } from "./components/TreeView.tsx";
import state from "./state.ts";
import NavHeader from "./NavHeader.tsx";
import { endpoint } from "@signals";

export default function Nav() {
  const { mapping, currentUrl } = state.value;

  return (
    <div id="nav">
      <NavHeader />
      <TreeView
        node={mapping}
        parentName="http:/"
        currentUrl={currentUrl}
        endpoint={endpoint.value!}
      />
    </div>
  );
}
