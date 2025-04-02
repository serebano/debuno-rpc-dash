import "./addrbar2.css";
import { useState } from "preact/hooks";
import CodIcon from "./codicon/CodIcon.tsx";
import Icon, { type IconProps } from "./icons/icon.tsx";
import xurl from "@signals/xurl.ts";

export function AddrBar({ value }: { value: string }) {
  const [endpoint, setEndpoint] = useState(
    value || localStorage.getItem("lasturl") ||
      localStorage.getItem("origin") || "",
  );

  const iconProps: IconProps = {
    size: 28,
    shape: "circle",
    shapeFill: "#282c34",
    shapeStrokeWith: 0,
    fill: "rgba(255,255,255,0.5)",
  };

  return (
    <div class="addrbar2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          xurl.goto(endpoint);
        }}
      >
        <Icon {...iconProps} />
        <input
          type="text"
          value={value || endpoint}
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
          <CodIcon name="arrow-right" size={24} />
        </button>
      </form>
    </div>
  );
}
