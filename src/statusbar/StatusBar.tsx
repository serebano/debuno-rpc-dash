import "./StatusBar.css";
import config from "@config";
import { connect } from "@connect/connect.ts";
import CodIcon from "../codicon/CodIcon.tsx";
import DotIcon from "../icons/DotIcon.tsx";
import { editFallback } from "@connect/utils.ts";

export function StatusBar() {
  return (
    <div id="statusbar">
      <span></span>
      <DotIcon
        size={14}
        state={connect.instance.value
          ?.STATE[connect.instance.value?.readyState] as any}
      />
      <span>
        {connect.instance.value?.STATE[connect.instance.value?.readyState]}
      </span>
      <span></span>
      <CodIcon name="bracket-dot" />
      {connect.instance.value?.config
        ? (
          <span>
            <a
              onClick={(e) => {
                e.preventDefault();
                editFallback(connect.instance.value?.config!);
              }}
            >
              {connect.instance.value?.config}
            </a>
          </span>
        )
        : "No Config"}

      <span style="flex:1"></span>
      <span>{config.name} {config.version}</span>
      <span></span>
    </div>
  );
}
