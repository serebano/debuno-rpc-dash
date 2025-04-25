import { render } from "preact";
import "./sw-register.ts";
import { App } from "./app.tsx";
import { Index } from "./index/Index.tsx";
import { About } from "./about.tsx";
import * as signals from "@signals";
import * as actions from "@actions";
import * as utils from "@utils";
import { connect } from "@connect";

Object.assign(globalThis, { utils, signals, actions });

function Main() {
  switch (connect.url.value) {
    case "":
      return <Index />;
    case "about":
      return <About />;
    default:
      return <App />;
  }
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
// if (import.meta.hot) {
//   await connect.restore();
// }

render(<Main />, document.body);

if (import.meta.hot) {
  await connect.restore();

  import.meta.hot.dispose(() => {
    connect.close();
    connect.dispose();
  });
}
