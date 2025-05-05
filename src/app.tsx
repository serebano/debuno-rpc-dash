import "./app.css";
import Nav from "./nav/Nav.tsx";
import { EditorPanelGroup } from "./body/Editor.tsx";
import { InfoPanel } from "./infopanel/InfoPanel.tsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useHotKey } from "./hooks/useHotKey.ts";
import { connect } from "@connect/connect.ts";
import { useScreenSize } from "./hooks/useScreenSize.ts";

function TerminalPanel() {
  return <div class="centered">Terminal</div>;
}

export function App() {
  const panels = connect.panels;
  const screenSize = useScreenSize();
  const minSizePixels = 250;
  const minSizePercentage = minSizePixels / screenSize.width * 100;

  return (
    <PanelGroup autoSaveId="rpc:layout" direction="horizontal">
      {panels.explorer && (
        <>
          <Panel
            id="panel-explorer"
            order={1}
            defaultSize={minSizePercentage}
            minSize={minSizePercentage}
            maxSize={50}
          >
            <PanelGroup autoSaveId="rpc:explorer" direction="vertical">
              <Panel id="panel-nav" order={1}>
                <Nav />
              </Panel>
              {panels.info && (
                <>
                  <PanelResizeHandle class="row-resize-handler" />
                  <Panel id="panel-info" order={2}>
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
          <Panel id="panel-editor" order={1}>
            <EditorPanelGroup />
          </Panel>
          {panels.terminal && (
            <>
              <PanelResizeHandle class="row-resize-handler" />
              <Panel
                id="panel-terminal"
                order={2}
                defaultSize={30}
                minSize={20}
              >
                <TerminalPanel />
              </Panel>
            </>
          )}
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}
