import config from "@config";

export default function NavHeader() {
  return (
    <div class="nav-header">
      <a onClick={() => location.hash = ""}>
        <b>{config.name}</b>&nbsp;v{config.version}
      </a>
    </div>
  );
}
