import { render } from "preact";
import "./sw-register.ts";
import { App } from "./app.tsx";
import { Index } from "./index/Index.tsx";
import { About } from "./about.tsx";
import * as signals from "@signals";
import * as actions from "@actions";
import * as utils from "@utils";

Object.assign(globalThis, { utils, signals, actions });

function Main() {
  switch (signals.xurl.host) {
    case "index":
      return <Index />;
    case "about":
      return <About />;
    default:
      return <App />;
  }
}

render(<Main />, document.body);
