// deno-lint-ignore-file no-window
import "./style.css";
import CodIcon from "../codicon/CodIcon.tsx";
import xurl from "@signals/xurl.ts";
import X from "https://esm.sh/highlight.js@11.11.1/lib/languages/typescript";

export function AddrBar() {
  return (
    <div class="addrbar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @ts-ignore ...
          const value = e.currentTarget[0].value;
          // @ts-ignore .
          e.currentTarget[0].blur();
          xurl.goto(
            value.startsWith("/") || value.startsWith("http")
              ? value
              : "/" + value,
          );
        }}
      >
        {/* <Icon {...iconProps} /> */}
        <a
          style={{
            background: "transparent",
            border: "none",
            padding: "0",
            margin: "0",
            color: "inherit",
          }}
          onClick={() => xurl.back()}
        >
          <CodIcon name="arrow-left" size={18} />
        </a>
        <a
          type="button"
          style={{
            background: "transparent",
            border: "none",
            padding: "0",
            margin: "0",
            color: "inherit",
          }}
          onClick={() => xurl.forward()}
        >
          <CodIcon name="arrow-right" size={18} />
        </a>

        <input
          type="text"
          value={xurl.host + xurl.path}
          // onInput={(e) => setEndpoint(e.currentTarget.value)}
        />

        <a
          style={{
            background: "transparent",
            border: "none",
            padding: "0",
            margin: "0",
            color: "inherit",
          }}
          onClick={() => window.open(xurl.href, "rpc")}
        >
          <CodIcon name="link-external" size={18} />
        </a>
      </form>
    </div>
  );
}
