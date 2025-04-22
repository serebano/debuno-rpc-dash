// deno-lint-ignore-file no-window
import "./style.css";
import CodIcon from "../codicon/CodIcon.tsx";
import xurl from "@signals/xurl.ts";
import { connect } from "@connect";

export function AddrBar() {
  return (
    <div class="addrbar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @ts-ignore ...
          const value = e.currentTarget[0].value;
          location.hash = value;
          // @ts-ignore .
          e.currentTarget[0].blur();
          // xurl.goto(
          //   value.startsWith("/") || value.startsWith("http")
          //     ? value
          //     : "/" + value,
          // );
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
          onClick={() => history.back()}
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
          onClick={() => history.forward()}
        >
          <CodIcon name="arrow-right" size={18} />
        </a>

        <input
          type="text"
          value={connect.url.value.split("://").pop()}
          onFocus={(e) => {
            e.preventDefault();
            e.currentTarget.value = connect.url.value;
          }}
          onBlur={(e) => {
            e.preventDefault();
            e.currentTarget.value = connect.url.value.split("://").pop()!;
          }}
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
