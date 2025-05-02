import "./app.css";
import Nav from "./nav/Nav.tsx";
import Editor from "./body/Editor.tsx";
import { InfoPanel } from "./infopanel/InfoPanel.tsx";
import { connect } from "@connect/connect.ts";

export function App() {
  return (
    <>
      <div id="sidepanel" style={{ width: connect.sidePanelWidth.value }}>
        <Nav />
        <InfoPanel />
      </div>
      <Editor />
    </>
  );
}
