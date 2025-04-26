import { signal } from "@preact/signals";
import "./style.css";

const pkg = signal<Record<string, any> | undefined>();

async function fetchPkg() {
  try {
    return await (await fetch(
      `https://raw.githubusercontent.com/serebano/debuno-rpc/refs/heads/main/package.json?cache_bust=${Date.now()}`,
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

export function Install() {
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
        <pre>$&nbsp;<code contentEditable           onFocus={(e) => {
                    e.preventDefault();
                    const range = document.createRange();
                    range.selectNodeContents(e.currentTarget);
                    const selection = window.getSelection();
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                  }}>curl -fsSL {new URL('/install', location.origin).href} | sh</code></pre>
        <pre>$&nbsp;<code contentEditable onFocus={(e) => {
                    e.preventDefault();
                    const range = document.createRange();
                    range.selectNodeContents(e.currentTarget);
                    const selection = window.getSelection();
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                  }}>rpc create myapp --sic</code></pre>
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
