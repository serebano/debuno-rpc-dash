import "./style.css";
import EditorBody from "./EditorBody.tsx";
import { connect } from "@connect";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodIcon from "../codicon/CodIcon.tsx";

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
      {
        /* <div>
        {connect.previewFile.value?.http} ({connect.previewFile.value?.version})
      </div> */
      }
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

export function EditorPanelGroup() {
  const panels = connect.panels;
  const originalSource = connect.file.value?.sources?.original;
  const generatedSource = connect.file.value?.sources?.generated;
  const previewFile = connect.previewFile.value;
  const dirname = connect.instance.value?.dirname;
  // const appdir = dirname?.split("/").pop()!;

  const relativePath = (absolutePath: string) =>
    dirname && absolutePath && absolutePath.startsWith(dirname)
      ? absolutePath.replace(dirname, "file:/")
      : absolutePath;

  return (
    <PanelGroup autoSaveId="rpc:editor" direction="horizontal">
      <Panel id="original" order={1}>
        <div class="panel-container">
          <div class="panel-header">
            <a
              onClick={(e) => {
                e.preventDefault();
                connect.file.value?.open({
                  type: "src",
                  format: connect.file.value.lang === "javascript"
                    ? "js"
                    : "ts",
                });
              }}
            >
              {relativePath(originalSource?.path!)}
            </a>
          </div>
          <EditorBody source="original" />
        </div>
      </Panel>
      {panels.generated && generatedSource && (
        <>
          <PanelResizeHandle class="col-resize-handler" />
          <Panel id="generated" order={2}>
            <div class="panel-container">
              <div class="panel-header">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    connect.file.value?.open({
                      type: "gen",
                      format: connect.file.value.lang === "javascript"
                        ? "js"
                        : "ts",
                    });
                  }}
                >
                  {relativePath(generatedSource.path)}
                </a>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    panels.generated = false;
                  }}
                >
                  <CodIcon name="close" />
                </a>
              </div>
              <EditorBody source="generated" />
            </div>
          </Panel>
        </>
      )}
      {panels.preview && (
        <>
          <PanelResizeHandle class="col-resize-handler" />
          <Panel id="preview" order={3}>
            <div class="panel-container">
              <div class="panel-header">
                <a href={`#${previewFile?.http}`}>{previewFile?.http}</a>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    panels.preview = false;
                  }}
                >
                  <CodIcon name="close" />
                </a>
              </div>
              <HTMLView />
            </div>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}
