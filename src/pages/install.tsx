import { signal } from "@preact/signals";
import "./style.css";

const pkg = signal<Record<string, any> | undefined>(await fetchPkg());

async function fetchPkg() {
  try {
    return await (await fetch(
      `https://raw.githubusercontent.com/serebano/debuno-rpc/refs/heads/main/package.json?cache_bust=${Date.now()}`,
    )).json();
  } catch (e) {
    console.warn(`(fetchPkg) error`, e);
  }
}

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
        <pre><code>$ curl -fsSL {new URL('/install', location.origin).href} | sh</code></pre>
        <pre><code>$ rpc create myapp --sic</code></pre>
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
