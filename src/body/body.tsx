import "./style.css";
import { markup } from "./markup.ts";
import { code, error, files, loc } from "@signals";

export default function Body() {
  const $html = error.value + markup(loc.value, code.value, files.value);

  return (
    <div
      id="body"
      dangerouslySetInnerHTML={{ __html: $html }}
    />
  );
}
