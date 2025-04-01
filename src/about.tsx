import "./app.css";
import config from "@config";

export function About() {
  return (
    <div class="centered">
      <div>
        <h1>
          {config.name} <b>{config.version}</b> {config.dev ? "(dev)" : ""}
        </h1>
        <a href="https://rpc.debuno.dev" target="_blank">
          https://rpc.debuno.dev
        </a>
      </div>
    </div>
  );
}
