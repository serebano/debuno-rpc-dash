import { addr, xurl } from "@signals";
import CodIcon from "../codicon/CodIcon.tsx";
import { AddrBar } from "../index/AddrBar.tsx";

export function EditorHeader1() {
  return (
    <div class="header">
      <span id="fileName">
        {addr.path.value}
      </span>
      <span style="flex:1"></span>

      <a href={xurl.href} target="_blank">
        <CodIcon name="link-external" />
      </a>
    </div>
  );
}

export default function EditorHeader() {
  return <></>;
}

export function EditorHeader2() {
  return (
    <div class="header">
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

      <div style={{ flexDirection: "row", display: "flex", gap: "5px" }}>
        <a
          onClick={(e) => {
            e.preventDefault();
            xurl.goto("/" + xurl.host);
          }}
        >
          {addr.host}
        </a>

        {addr.base.value.split("/").filter(Boolean).map((val) => {
          return (
            <a
              style={{ flexDirection: "row", display: "flex", gap: "5px" }}
              onClick={(e) => {
                e.preventDefault();
                xurl.goto(xurl.origin + addr.base);
              }}
            >
              <CodIcon name="chevron-right" />
              <span>{val}</span>
            </a>
          );
        })}

        {addr.path.value.split("/").filter(Boolean).map((val) => {
          return (
            <a
              style={{ flexDirection: "row", display: "flex", gap: "5px" }}
              onClick={(e) => {
                e.preventDefault();
                xurl.goto(xurl.origin + addr.base + val);
              }}
            >
              <CodIcon name="chevron-right" />
              <span>{val}</span>
            </a>
          );
        })}
      </div>

      <span style="flex:1"></span>

      <a href={xurl.href} target="_blank">
        <CodIcon name="link-external" />
      </a>
    </div>
  );
}
