import "./sw-register.ts";
import { render } from "preact";
import { App } from "./app.tsx";
import * as utils from "@utils";
import { connect } from "@connect";
import pages from "./pages/index.ts";
import { AddrBar } from "./addr/AddrBar.tsx";
import { StatusBar } from "./statusbar/StatusBar.tsx";

Object.assign(globalThis, { utils });

function Main() {
  const url = connect.url.value;
  const Page = url in pages ? pages[url as keyof typeof pages] : App;

  return (
    <>
      <AddrBar />
      <div id="app" class={url === "*" ? "reloading" : "reloaded"}>
        <Page />
      </div>
      <StatusBar />
    </>
  );
}

connect.on("*", (e) => {
  console.debug(
    `%c${e.target.endpoint.replace("://", ":")}%c on(%c${e.type}%c)`,
    `color:#ccc;background:#3c3c3c;border-radius:50px;font-size:11px;padding:2.5px 7px;font-family:-apple-system, BlinkMacSystemFont, sans-serif;`,
    `color:ccc;`,
    `color:#fe8d59;`,
    `color:ccc`,
    e.data ?? "",
  );
});

connect.init();

render(<Main />, document.querySelector("#rpcapp")!);

if (import.meta.hot) {
  // await connect.restore();

  import.meta.hot.dispose(() => {
    connect.close();
    connect.dispose();
  });
}
