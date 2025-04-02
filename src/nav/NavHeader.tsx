import { xurl } from "@signals";
import config from "@config";

export default function NavHeader() {
  return (
    <div class="nav-header">
      <a onClick={() => xurl.goto("/index")}>
        <b>{config.name}</b>&nbsp;v{config.version}
      </a>
    </div>
  );
}
