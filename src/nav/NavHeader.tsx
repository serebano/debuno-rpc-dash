import { host, origin, readyStateKey } from "@signals/sse.ts";
import Icon from "../icons/icon.tsx";
import DotIcon from "../icons/DotIcon.tsx";

const iconProps = {
  size: 22,
  padding: 0,
  strokeWidth: 50,
  stroke: "#21252b",
  bgPadding: 10,
  bgColor: "rgba(0,0,0,0)",
  fill: "rgb(255 255 255 / 40%)",
};

export default function NavHeader() {
  return (
    <div class="nav-header">
      <Icon {...iconProps} />
      {
        /* <a
        class="origin"
        href={origin.value}
        target="_blank"
        title={origin.value}
      >
        {host.value}
      </a> */
      }
      <div style={{ flex: "auto" }}></div>
      {/* <DotIcon state={readyStateKey.value} size={16} /> */}
    </div>
  );
}
