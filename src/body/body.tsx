import "./style.css";
import { markup } from "./markup.ts";
import { code, error, files } from "@signals";
import loc from "@signals/loc.ts";

export default function Body() {
  const $html = error.value + markup(loc.value, code.value, files.value);

  return (
    <div
      id="body"
      dangerouslySetInnerHTML={{ __html: $html }}
    />
  );
}
