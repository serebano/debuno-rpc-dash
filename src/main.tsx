import { render } from "preact";
import { App } from "./app.tsx";
import * as signals from "@signals";
import * as actions from "@actions";
import * as utils from "@utils";

Object.assign(globalThis, { utils, signals, actions });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(
    (registration) => {
      console.log("Service Worker registered:", registration.scope);
    },
  ).catch((error) => {
    console.error("Service Worker registration failed:", error);
  });
}

function Main() {
  return signals.xurl.host === "blank"
    ? <div>Invalid URL: {location.href}</div>
    : <App />;
}

render(<Main />, document.body);
