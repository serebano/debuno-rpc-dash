import "./style.css";
import EditorBody from "./EditorBody.tsx";
import EditorHeader from "./EditorHeader.tsx";
import { connect } from "@connect";

function EditorView(params: { source: "original" | "generated" }) {
  return (
    <div class="preview main">
      <EditorHeader />
      <EditorBody source={params.source} />
    </div>
  );
}

function HTMLView() {
  return (
    <div class="preview main">
      <iframe
        src={connect.file.value?.http}
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
  const hasGenerated = !!connect.file.value?.sources?.generated &&
    connect.splitView.value === true;
  const isHTML = connect.file.value?.lang === "html" &&
    connect.splitView.value === true;
  return (
    <div id="body" class="editor">
      {hasGenerated
        ? (
          <>
            <EditorView key="original" source="original" />
            <EditorView key="generated" source="generated" />
          </>
        )
        : isHTML
        ? (
          <>
            <EditorView key="original" source="original" />
            <HTMLView key="preview" />
          </>
        )
        : <EditorView key="original" source="original" />}
    </div>
  );
}
