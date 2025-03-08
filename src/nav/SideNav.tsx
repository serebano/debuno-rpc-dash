import "./style.css";
import { TreeView } from "./components/TreeView.tsx";
import state from "./state.ts";
import NavHeader from "./NavHeader.tsx";

export default function Nav() {
  const { mapping, currentUrl } = state.value;

  return (
    <div id="nav">
      <NavHeader />
      <TreeView
        node={mapping}
        currentUrl={currentUrl}
      />
    </div>
  );
}
