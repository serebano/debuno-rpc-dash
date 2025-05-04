import "./style.css";
import EditorBody from "./EditorBody.tsx";
import { connect } from "@connect";
import { signal } from "@preact/signals";
import { Panels } from "../components/Panels.tsx";
import { useEffect, useRef } from "preact/hooks";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function HTMLView() {
  if (!connect.previewFile.value) {
    return (
      <div class="centered">
        No Preview Available
      </div>
    );
  }
  return (
    <div style="width:100%;height:100%">
      <div>
        {connect.previewFile.value?.http} ({connect.previewFile.value?.version})
      </div>
      <iframe
        src={connect.previewFile.value?.http}
        width="100%"
        height="100%"
        allowTransparency
        allowFullScreen
        class="preview-html-iframe"
      />
    </div>
  );
}

OriginalPanel.hotkey = "cmd+o";
OriginalPanel.size = signal(400);
OriginalPanel.enabled = signal(true);
export function OriginalPanel() {
  return <EditorBody source="original" />;
}

GeneratedPanel.hotkey = "cmd+\\";
GeneratedPanel.size = signal(400);
GeneratedPanel.enabled = signal(true);
export function GeneratedPanel() {
  return <EditorBody source="generated" />;
}

PreviewPanel.hotkey = "cmd+p";
PreviewPanel.size = signal(0);
PreviewPanel.enabled = signal(true);
PreviewPanel.toggle = () => {
  const comp = PreviewPanel;
  if (comp.enabled.value === true) {
    if (comp.size.value === 0) {
      comp.size.value = 100;
    }
  }
};
export function PreviewPanel() {
  return <HTMLView />;
}

EditorPanel.hotkey = "cmd+e";
EditorPanel.enabled = signal(true);
EditorPanel.size = signal(300);
// EditorPanel.size.subscribe((size) => console.warn(`Editor size`, size));

export function EditorPanel() {
  const comp = EditorPanel;
  useEffect(() => {
    console.log(`EditorPanel size`, comp.enabled.value, comp.size.value);
  }, [comp.enabled.value, comp.size.value]);

  return (
    <Panels
      // size={comp.size}
      type="row"
      panels={[
        OriginalPanel,
        GeneratedPanel,
        PreviewPanel,
      ]}
    />
  );
}

export function EditorPanelGroup() {
  const showGeneratedPanel = connect.splitView.value;
  const showPreviewPanel = connect.preview.value;

  return (
    <PanelGroup autoSaveId="rpc:editor" direction="horizontal">
      <Panel id="original" order={1}>
        <EditorBody source="original" />
      </Panel>
      {showGeneratedPanel && (
        <>
          <PanelResizeHandle class="col-resize-handler" />

          <Panel id="generated" order={2}>
            <EditorBody source="generated" />
          </Panel>
        </>
      )}
      {showPreviewPanel && (
        <>
          <PanelResizeHandle class="col-resize-handler" />
          <Panel id="preview" order={3}>
            <HTMLView />
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}
