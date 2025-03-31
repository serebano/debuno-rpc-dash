import hljs from "https://esm.sh/highlight.js@11.11.1/lib/core";
import "./register.ts";
import { code, error, files, xurl } from "@signals";
import { getFileExtension, linkImports } from "@utils";
import { createLineNumbers, wrapLines } from "./utils.ts";

export default function EditorBody() {
  const sourceCode = code.value;
  const highlightedCode = hljs.highlight(sourceCode, {
    language: getFileExtension(xurl.pathname) ?? "text",
  }).value;

  let codeMask = sourceCode;
  codeMask = linkImports(codeMask, files.value);
  codeMask = wrapLines(codeMask);

  const linesMask = createLineNumbers(sourceCode);

  return (
    <div class="wrapper">
      <div dangerouslySetInnerHTML={{ __html: linesMask }} class="lines-mask">
      </div>
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
