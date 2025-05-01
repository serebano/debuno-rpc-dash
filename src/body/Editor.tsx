import "./style.css";
import EditorBody from "./EditorBody.tsx";
import EditorHeader from "./EditorHeader.tsx";
import { connect } from "@connect";

function EditorView(params: { source: "original" | "generated" }) {
  if (params.source === "generated") {
    const hasGenerated = !!connect.file.value?.sources?.generated &&
      connect.splitView.value === true;
    if (!hasGenerated) return null;
  }
  return (
    <div class="preview main">
      <EditorHeader />
      <EditorBody source={params.source} />
    </div>
  );
}

function HTMLView() {
  const isHTML = connect.preview.value === true;
  //connect.file.value?.lang === "html" &&

  if (!isHTML) {
    return null;
  }
  return (
    <div class="preview main">
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

export default function Editor() {
  return (
    <div id="body" class="editor">
      <EditorView key="original" source="original" />
      <EditorView key="generated" source="generated" />
      <HTMLView key="preview" />
    </div>
  );
}
