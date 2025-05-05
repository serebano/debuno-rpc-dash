import "./style.css";
import { connect } from "@connect/connect.ts";

function FileInfo() {
  const file = connect.file.value;
  const dirname = connect.instance.value?.dirname;
  const endpoint = connect.instance.value?.endpoint;

  // const appdir = dirname?.split("/").pop()!;

  const relativePath = (absolutePath: string) =>
    dirname && absolutePath.startsWith(dirname)
      ? absolutePath.replace(dirname, "")
      : absolutePath;

  return (
    <>
      <div>
        Version {file?.version || 0}
        <div style="font-size:11px">
          {file?.timestamp ? new Date(file?.timestamp).toLocaleString() : ""}
        </div>
      </div>

      <div>
        <div class="summary">Dirname</div>
        {dirname}
      </div>

      <div>
        <div class="summary">Endpoint</div>
        {endpoint}
      </div>

      <div>
        <div class="summary">URL</div>
        <a href={`#${file?.http}`}>{file?.http}</a>
      </div>

      <div>
        <div class="summary">Source Path</div>
        <a
          href={`#`}
          onClick={(e) => {
            e.preventDefault();
            file?.open();
          }}
        >
          {relativePath(file?.sources?.original.path!)}
        </a>
      </div>

      {file?.sources?.generated
        ? (
          <div>
            <div class="summary">Generated</div>
            <a
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                connect.splitView.value = true;
                file?.open({ type: "gen" });
              }}
            >
              {relativePath(file?.sources?.generated.path)}
            </a>
          </div>
        )
        : null}

      {file?.dependencies
        ? (
          <details open>
            <summary class="summary">Dependencies</summary>
            {Object.entries(file?.dependencies || {}).map(([url, ver]) => {
              return (
                <div key={url}>
                  <a href={`#${url}`}>{url}</a> {ver}
                </div>
              );
            })}
          </details>
        )
        : null}
      {file?.dependents
        ? (
          <details open>
            <summary class="summary">Dependents</summary>
            {Object.entries(file?.dependents || {}).map(([url, ver]) => {
              return (
                <div key={url}>
                  <a href={`#${url}`}>{url}</a> {ver}
                </div>
              );
            })}
          </details>
        )
        : null}

      <div>
        <pre>
        {JSON.stringify(file, null, 4)}
        </pre>
      </div>
    </>
  );
}

export function InfoPanel() {
  return (
    <div id="infopanel">
      {/* <div class="title">Info</div> */}
      <div class="content">
        <FileInfo />
      </div>
    </div>
  );
}
