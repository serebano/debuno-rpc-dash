import "./style.css";
import { markup } from "./markup.ts";
import { code, error, files } from "@signals";
import loc from "@signals/loc.ts";
import Editor from "./Editor.tsx";

export default function Body() {
  return <Editor />;

  const __html = error.value + markup(loc.value, code.value, files.value);

  return (
    <div
      id="body"
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
