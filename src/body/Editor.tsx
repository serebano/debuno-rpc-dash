import "./style.css";
import EditorBody from "./EditorBody.tsx";
import EditorHeader from "./EditorHeader.tsx";

export default function Editor() {
  return (
    <div id="body">
      <div id="preview" class="main">
        <EditorHeader />
        <EditorBody />
      </div>
    </div>
  );
}
