// deno-lint-ignore-file no-window
import "./style.css";
import CodIcon from "../codicon/CodIcon.tsx";
import { connect } from "@connect";

function FileLang() {
  return connect.file.value?.lang === "javascript" ||
      connect.file.value?.lang === "typescript"
    ? (
      <a
        class="file-lang"
        onClick={async (e) => {
          e.preventDefault();
          const file = connect.file.value;
          if (file) {
            file.lang = file.lang === "javascript"
              ? "typescript"
              : "javascript";
            await file.fetch();
            connect.file.value = undefined;
            connect.file.value = file;
          }
        }}
      >
        <span
          class={connect.file.value?.lang
            ? `lang-${connect.file.value?.lang}`
            : "lang-unknown"}
        >
        </span>
      </a>
    )
    : null;
}

export function AddrBar() {
  const iconSize = 16;
  const hasGenerated = !!connect.file.value?.sources?.generated;

  return (
    <div class="addrbar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @ts-ignore ...
          const value = e.currentTarget[0].value;
          location.hash = value;
          // @ts-ignore .
          // e.currentTarget[0].blur();
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
          <CodIcon name="arrow-left" size={iconSize} />
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
          <CodIcon name="arrow-right" size={iconSize} />
        </a>

        <input
          type="text"
          value={connect.url.value.split("://").pop()}
          onFocus={(e) => {
            e.preventDefault();
            e.currentTarget.value = connect.url.value;
            e.currentTarget.select();
          }}
          onBlur={(e) => {
            e.preventDefault();
            e.currentTarget.value = connect.url.value.split("://").pop()!;
          }}
        />
        <FileLang />
        {hasGenerated
          ? (
            <a
              style={{
                background: "transparent",
                border: "none",
                padding: "0",
                margin: "0",
                color: "inherit",
              }}
              onClick={() => {
                connect.splitView.value = !connect.splitView.value;
              }}
            >
              <CodIcon name="split-horizontal" size={iconSize} />
            </a>
          )
          : null}
        <a
          style={{
            background: "transparent",
            border: "none",
            padding: "0",
            margin: "0",
            color: "inherit",
          }}
          onClick={() => window.open(connect.url.value, "rpc")}
        >
          <CodIcon name="link-external" size={iconSize} />
        </a>
      </form>
    </div>
  );
}
