import { endpoint, xurl } from "@signals";
import CodIcon from "../codicon/CodIcon.tsx";

export default function EditorHeader() {
  return (
    <div class="header">
      <span id="fileName">
        {xurl.href.replace(endpoint.value ?? "", "")}
      </span>
      <span style="flex:1"></span>

      <a href={xurl.href} target="_blank">
        <CodIcon name="link-external" />
      </a>
    </div>
  );
}
