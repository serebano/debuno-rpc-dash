import { render } from "preact";
import { App } from "./app.tsx";
import { Welcome } from "./welcome.tsx";
import * as signals from "@signals";
import * as actions from "@actions";
import * as utils from "@utils";
import { registerServiceWorker } from "./sw-register.ts";

Object.assign(globalThis, { utils, signals, actions });

function Main() {
  return signals.xurl.host === "index" ? <Welcome /> : <App />;
}

render(<Main />, document.body);

registerServiceWorker();
