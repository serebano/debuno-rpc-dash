import { endpoint, xurl } from "@signals";
import CodIcon from "../codicon/CodIcon.tsx";

export default function NavHeader() {
  return (
    <div class="nav-header">
      <a
        onClick={(e) => {
          e.preventDefault();
          xurl.back();
        }}
      >
        <div class="goback">
          <CodIcon name="arrow-left" style={{ fontWeight: "bold" }} />
        </div>
      </a>

      <a
        onClick={(e) => {
          e.preventDefault();
          xurl.goto(endpoint.value);
        }}
      >
        <div style={{ flex: "auto" }}>{endpoint.value?.split("://").pop()}</div>
      </a>
    </div>
  );
}
