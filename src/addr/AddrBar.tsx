// deno-lint-ignore-file no-window
import "./style.css";
import CodIcon from "../codicon/CodIcon.tsx";
import { connect } from "@connect";
import { editFallback, getLangFromExt } from "@connect/utils.ts";

function FileLang() {
  return connect.file.value?.http &&
      getLangFromExt(connect.file.value?.http) === "typescript"
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
  const isHTML = connect.file.value?.lang === "html";

  return (
    <div class="addrbar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @ts-ignore ...
          const value = e.currentTarget[0].value;
          location.hash = value;
        }}
      >
        {/* <Icon {...iconProps} /> */}
        <a onClick={() => history.back()}>
          <CodIcon name="arrow-left" size={iconSize} />
        </a>
        <a onClick={() => history.forward()}>
          <CodIcon name="arrow-right" size={iconSize} />
        </a>

        <a
          class="refresh"
          onClick={() => {
            const currentHash = location.hash.slice(1);
            connect.url.value = "*";
            setTimeout(() => {
              connect.url.value = currentHash;
            }, 300);
          }}
        >
          <CodIcon name="refresh" size={iconSize} />
        </a>

        <input
          type="text"
          placeholder="Welcome"
          value={(connect.url.value === "*"
            ? location.hash.slice(1)
            : (connect.url.value || ""))
            .split("://").pop()}
          onFocus={(e) => {
            e.preventDefault();
            e.currentTarget.value = connect.url.value;
            e.currentTarget.select();
          }}
          onBlur={(e) => {
            e.preventDefault();
            e.currentTarget.value = connect.url.value.split("://").pop()!;
          }}
          // style={connect.file.value?.version ? "margin-right:-5em" : ""}
        />
        <div class="input-icons">
          {connect.file.value?.version
            ? (
              <span style="opacity:0.5;font-size:14px;font-weight:200">
                {"v" + connect.file.value?.version}
              </span>
            )
            : null}

          <FileLang />
        </div>

        {hasGenerated || isHTML
          ? (
            <a
              class={`${connect.splitView.value ? "active" : ""}`}
              onClick={() => {
                connect.splitView.value = !connect.splitView.value;
              }}
            >
              <CodIcon name="open-preview" size={iconSize} />
            </a>
          )
          : null}
        {connect.instance.value?.path || connect.file.value?.file
          ? (
            <a
              title={`Edit ${
                connect.file.value?.file! || connect.instance.value?.path!
              }`}
              onClick={(e) => {
                e.preventDefault();
                editFallback(
                  connect.file.value?.file! || connect.instance.value?.path!,
                );
              }}
            >
              <CodIcon name="vscode-insiders" size={iconSize} />
            </a>
          )
          : null}
        {connect.file.value
          ? (
            <a
              onClick={() => window.open(connect.file.value?.http, "rpc")}
            >
              <CodIcon name="link-external" size={iconSize - 1} />
            </a>
          )
          : null}
      </form>
    </div>
  );
}
