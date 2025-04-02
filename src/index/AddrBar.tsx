import { useState } from "preact/hooks";
import CodIcon from "../codicon/CodIcon.tsx";
import Icon, { type IconProps } from "../icons/icon.tsx";
import xurl from "@signals/xurl.ts";

export function AddrBar() {
  const [endpoint, setEndpoint] = useState(
    new URL(
      localStorage.getItem("lasturl") || localStorage.getItem("origin") || "",
    ).href,
  );
  const iconProps: IconProps = {
    size: 32,
    shape: "circle",
    shapeFill: "rgba(0,0,0,0)",
    shapeStrokeWith: 0,
    fill: "rgba(255,255,255,0.5)",
  };

  return (
    <div class="index-addrbar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          xurl.goto(endpoint);
        }}
      >
        <Icon {...iconProps} />
        <input
          type="text"
          value={endpoint}
          onInput={(e) => setEndpoint(e.currentTarget.value)}
        />
        <button
          type="submit"
          style={{
            background: "transparent",
            border: "none",
            padding: "0",
            margin: "0",
            color: "inherit",
          }}
        >
          <CodIcon name="arrow-right" size={28} />
        </button>
      </form>
    </div>
  );
}
