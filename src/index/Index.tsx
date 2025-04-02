import "./style.css";
import config from "@config";
import { AddrBar } from "./AddrBar.tsx";

export function Index() {
  return (
    <div id="welcome">
      <AddrBar />

      <div style={{ display: "flex", gap: 5 }}>
        <b style={{ fontSize: 14, fontWeight: 400, opacity: 0.8 }}>
          {config.name}
        </b>
        <span
          style={{
            fontSize: 14,
            fontWeight: 300,
            opacity: 0.6,
          }}
        >
          v{config.version}
        </span>
      </div>
    </div>
  );
}
