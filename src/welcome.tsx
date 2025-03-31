import { xurl } from "@signals";
import "./welcome.css";
import config from "@config";
import type { JSX } from "preact";
import { useState } from "preact/hooks";
import Icon from "./icons/icon.tsx";
import CodIcon from "./codicon/CodIcon.tsx";

const iconProps = {
  size: 256,
  padding: 0,
  strokeWidth: 30,
  stroke: "#21252b",
  bgPadding: 0,
  bgColor: "rgba(0,0,0,0)",
  fill: "rgb(255 255 255 / 10%)",
};

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
      <div style={{ padding: "20px", marginBottom: "-50px" }}>
        <Icon {...iconProps} />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              xurl.host = origin;
            }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <CodIcon name="arrow-right" size={28} />

            <input
              style={{
                borderRadius: "50px",
                padding: "10px 20px",
              }}
              type="text"
              value={origin}
              onInput={(e) => setOrigin(e.currentTarget.value)}
            />
          </form>
        </div>
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
    </div>
  );
}
