import { History } from "./history.tsx";
import "../app.css";
import config from "@config";
import { Guide } from "./guide.tsx";

export function Welcome() {
  return (
    <div style="width:100%;height:100%;display:flex;flex-direction:column">
      {localStorage.getItem("rpc:url") ? <History /> : <Guide />}
      <div style="flex:1"></div>
      <div style="padding-left:15%;padding-bottom:50px">
        <h3>
          {config.name}
          <b style="font-weight:200;opacity:0.6;margin-left:10px">
            {config.version}
          </b>
        </h3>
        <a href="https://rpc.debuno.dev" target="_blank" style="color:#d0cd2c">
          https://rpc.debuno.dev
          {}
        </a>
      </div>
    </div>
  );
}
