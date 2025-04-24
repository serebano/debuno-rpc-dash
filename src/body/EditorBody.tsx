import hljs from "https://esm.sh/highlight.js@11.11.1/lib/core";
import "./register.ts";
import { getFileExtension, linkImports } from "@utils";
import { wrapLines } from "./utils.ts";
import { connect } from "@connect";
import { LineNumbers } from "./LineNumbers.tsx";

export default function EditorBody(
  params?: { source?: "original" | "generated" },
) {
  params = params || {};
  params.source = params.source || "original";

  const sourceCode = connect.file.value?.sources?.[params.source]?.contents ||
    "";

  if (!connect.file.value) {
    return <div class="wrapper">No file selected</div>;
  }

  if (connect.file.value.error) {
    return (
      <div class="wrapper">
        <pre>{JSON.stringify(connect.file.value.error, null, 4)}</pre>
      </div>
    );
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
      <LineNumbers source={params.source} />
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
