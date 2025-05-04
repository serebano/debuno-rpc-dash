import "./app.css";
import Nav from "./nav/Nav.tsx";
import { EditorPanelGroup } from "./body/Editor.tsx";
import { InfoPanel } from "./infopanel/InfoPanel.tsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useHotKey } from "./hooks/useHotKey.ts";
import { connect } from "@connect/connect.ts";

function TerminalPanel() {
  return <div class="centered">Terminal</div>;
}

export function App() {
  useHotKey("cmd+.", () => {
    connect.infoView.value = !connect.infoView.value;
  }, { preventDefault: true });

  useHotKey(`cmd+\\`, () => {
    connect.splitView.value = !connect.splitView.value;
  }, { preventDefault: true });

  useHotKey(`cmd+'`, () => {
    connect.preview.value = !connect.preview.value;
  }, { preventDefault: true });

  useHotKey(`cmd+;`, () => {
    connect.terminalPanel.value = !connect.terminalPanel.value;
  }, { preventDefault: true });

  useHotKey(`cmd+e`, () => {
    connect.explorerPanel.value = !connect.explorerPanel.value;
    console.log("connect.explorerPanel.value", connect.explorerPanel.value);
  }, { preventDefault: true });

  const showTerminalPanel = connect.terminalPanel.value;
  const showInfoPanel = connect.infoView.value;
  const showExplorerPanel = connect.explorerPanel.value;

  return (
    <PanelGroup autoSaveId="rpc:layout" direction="horizontal">
      {showExplorerPanel && (
        <>
          <Panel id="explorer" order={1} defaultSize={20} minSize={20}>
            <PanelGroup autoSaveId="rpc:explorer" direction="vertical">
              <Panel id="nav" order={1}>
                <Nav />
              </Panel>
              {showInfoPanel && (
                <>
                  <PanelResizeHandle class="row-resize-handler" />
                  <Panel id="info" order={2}>
                    <InfoPanel />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </Panel>
          <PanelResizeHandle class="col-resize-handler" />
        </>
      )}
      <Panel id="body" order={2}>
        <PanelGroup autoSaveId="rpc:body" direction="vertical">
          <Panel id="editor" order={1}>
            <EditorPanelGroup />
          </Panel>
          {showTerminalPanel && (
            <>
              <PanelResizeHandle class="row-resize-handler" />
              <Panel id="terminal" order={2} defaultSize={30} minSize={20}>
                <TerminalPanel />
              </Panel>
            </>
          )}
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}
