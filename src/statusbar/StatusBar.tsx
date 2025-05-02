import config from "@config";

export function StatusBar() {
  return (
    <div id="statusbar">
      <span></span>
      <span>{config.name} {config.version}</span>
    </div>
  );
}
