import { xurl } from "@signals";
import "./welcome.css";
import config from "@config";
import type { JSX } from "preact";
import { useState } from "preact/hooks";

export function Welcome() {
  const [origin, setOrigin] = useState(
    new URL(localStorage.getItem("origin") || "http://localhost:8080").host,
  );

  const goto: JSX.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    xurl.goto(e?.currentTarget.href);
  };

  return (
    <div id="welcome">
      <h1>Get started</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          xurl.host = origin;
        }}
      >
        <input
          type="text"
          value={origin}
          onInput={(e) => setOrigin(e.currentTarget.value)}
        />
      </form>
      <ul>
        <li>
          <p>
            Using <b>{config.protocolHandler.protocol}</b> protocol
          </p>
          <a
            href={`${new URL(
              config.protocolHandler.url.replace(
                "%s",
                encodeURIComponent(
                  config.protocolHandler.protocol + "://" + origin,
                ),
              ),
              location.origin,
            )}`}
            onClick={goto}
          >
            {config.protocolHandler.protocol}://{origin}
          </a>
        </li>
        <li>
          <p>
            Using <b>{location.origin}</b> origin
          </p>
          <a href={`${location.origin}/${origin}`} onClick={goto}>
            {location.origin}/{origin}
          </a>
        </li>
      </ul>
    </div>
  );
}
