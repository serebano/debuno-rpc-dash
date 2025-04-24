import "./style.css";
import config from "@config";
import { IndexAddrBar } from "./AddrBar.tsx";
// import { History } from "./history.tsx";

export function Index() {
  return (
    <div id="welcome">
      <IndexAddrBar />

      {/* <History /> */}
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
