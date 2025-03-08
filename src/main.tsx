import { render } from "preact";
import { App } from "./app.tsx";
import signals from "@signals";
import * as actions from "@actions";
import utils from "@utils";

Object.assign(globalThis, { utils, signals, actions });

function Main() {
  return signals.xurl.host === "blank"
    ? <div>Invalid URL: {location.href}</div>
    : <App />;
}

render(<Main />, document.body);
