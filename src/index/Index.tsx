// import "./style.css";
// import config from "@config";
// import { IndexAddrBar } from "./AddrBar.tsx";
// import { History } from "./history.tsx";

// export function Index() {
//   return (
//     <div id="welcome">
//       <IndexAddrBar />

//       {/* <History /> */}
//       <div style={{ display: "flex", gap: 5 }}>
//         <b style={{ fontSize: 14, fontWeight: 400, opacity: 0.8 }}>
//           {config.name}
//         </b>
//         <span
//           style={{
//             fontSize: 14,
//             fontWeight: 300,
//             opacity: 0.6,
//           }}
//         >
//           v{config.version}
//         </span>
//       </div>
//     </div>
//   );
// }

import { AddrBar } from "../addr/AddrBar.tsx";
import { History } from "./history.tsx";
import "../app.css";
import config from "@config";

export function Index() {
  return (
    <>
      <AddrBar />
      <div id="app">
        <div style="padding:50px">
          <History />
          <div style="padding:20px">
            <h3>
              {config.name} <b>{config.version}</b> {config.dev ? "(dev)" : ""}
            </h3>
            <a href="https://rpc.debuno.dev" target="_blank">
              https://rpc.debuno.dev
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
