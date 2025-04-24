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

export default function Editor() {
  const hasGenerated = !!connect.file.value?.sources?.generated &&
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
        : <EditorView key="original" source="original" />}
    </div>
  );
}
