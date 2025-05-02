import { signal } from "@preact/signals";
import "./style.css";

const pkg = signal<Record<string, any> | undefined>();

async function fetchPkg() {
  try {
    return await (await fetch(
      `https://raw.githubusercontent.com/serebano/debuno-rpc/refs/heads/main/package.json?cache_bust=${Date.now()}`,
      {
        headers: {},
      },
    )).json();
  } catch (e) {
    console.warn(`(fetchPkg) error`, e);
  }
}

fetchPkg().then((value) => {
  if (value.version && value.version !== pkg.peek()?.version) {
    pkg.value = value;
  }
});

async function autoselect(e: any) {
  e.preventDefault();
  const text = e.currentTarget.textContent;
  const range = document.createRange();
  range.selectNodeContents(e.currentTarget);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  try {
    console.log(e, e.currentTarget, text);
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

export function Guide() {
  fetchPkg().then((value) => {
    if (value.version && value.version !== pkg.peek()?.version) {
      pkg.value = value;
    }
  });
  return (
    <div class="page-install">
      <div>
        <h1 class="install-title">
          Install RPC Server <span>v{pkg.value?.version}</span>
        </h1>
        <div class="repo">
          <a href="https://github.com/serebano/debuno-rpc">
            https://github.com/serebano/debuno-rpc
          </a>
        </div>
        <div class="title">Using install script</div>
        <pre>$&nbsp;
          <code
          contentEditable
          onFocus={autoselect}>
            curl -fsSL {new URL('/install', location.origin).href} | sh
          </code>
        </pre>
        <pre>$&nbsp;
          <code
          contentEditable
          onFocus={autoselect}>
            rpc create 3030 myapp -sic
          </code>
        </pre>
        <div class="title">
          Using <b>npx</b>
        </div>
        <pre>$&nbsp;
          <code
          contentEditable
          onFocus={autoselect}>
            npx rpc create 3030 myapp -sic
          </code>
        </pre>
        <div>
          <i>[s] - Start</i>
        </div>
        <div>
          <i>[i] - Inspect</i>
        </div>
        <div>
          <i>[c] - Code</i>
        </div>
      </div>
    </div>
  );
}
