import "./style.css";
import config from "@config";

export function About() {
  return (
    <div class="page-about">
      <div>
        <h1 class="install-title">
          {config.name} <span>v{config.version}</span>
        </h1>

        <a href="https://rpc.debuno.dev" target="_blank" style="color:#d0cd2c">
          https://rpc.debuno.dev
        </a>
      </div>
    </div>
  );
}
