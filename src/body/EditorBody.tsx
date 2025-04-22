import hljs from "https://esm.sh/highlight.js@11.11.1/lib/core";
import "./register.ts";
// import { code, error, files, xurl } from "@signals";
import { getFileExtension, linkImports } from "@utils";
import { createLineNumbers, wrapLines } from "./utils.ts";
import { connect } from "@connect";

function LineNumbers() {
  const file = connect.file.value!;
  const { source = "", http } = file;
  const lineNumber = 1;
  return (
    <div class="lines-mask">
      {source.split("\n")
        .map((line, index) => (
          <a
            key={index}
            id={`lnr-${index + 1}`}
            class={`${index === lineNumber - 1 ? "selected" : ""}`}
            title={`Edit line ${index + 1}`}
            href={`${http}:${index + 1}`}
            onClick={(e) => {
              e.preventDefault();
              file.open({ line: index + 1 });
            }}
          >
            {index + 1}
          </a>
        ))}
    </div>
  );
}

export default function EditorBody() {
  const sourceCode = connect.file.value?.source || "";
  if (!connect.file.value) {
    return <div class="wrapper">No file selected</div>;
  }
  const highlightedCode = hljs.highlight(sourceCode, {
    language: getFileExtension(connect.url.value) ?? "json",
  }).value;

  let codeMask = sourceCode;
  codeMask = linkImports(
    codeMask,
    connect.files.value.map((file) => file.http),
  );
  codeMask = wrapLines(codeMask);

  return (
    <div class="wrapper">
      <LineNumbers />
      <pre>
        <span class="scroll">
            <div dangerouslySetInnerHTML={{__html: codeMask}} id="code-editable" contenteditable autofocus onBeforeInput={() => false} onCut={() => false} onPaste={() => false} spellcheck={false} class="code-mask">
            </div>
            <code dangerouslySetInnerHTML={{__html: highlightedCode}} class="hljs">
            </code>
        </span>
      </pre>
    </div>
  );
}
