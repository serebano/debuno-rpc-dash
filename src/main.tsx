import { render } from "preact";
import "./sw-register.ts";
import { App } from "./app.tsx";
import { Welcome } from "./welcome.tsx";
import * as signals from "@signals";
import * as actions from "@actions";
import * as utils from "@utils";
import { About } from "./about.tsx";

Object.assign(globalThis, { utils, signals, actions });

function Main() {
  switch (signals.xurl.host) {
    case "index":
      return <Welcome />;
    case "about":
      return <About />;
    default:
      return <App />;
  }
}

render(<Main />, document.body);
