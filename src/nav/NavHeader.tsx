// import Icon from "../icons/icon.tsx";
import { xurl } from "@signals";
// import state from "./state.ts";

// const iconProps = {
//   size: 22,
//   padding: 0,
//   strokeWidth: 50,
//   stroke: "#21252b",
//   bgPadding: 10,
//   bgColor: "rgba(0,0,0,0)",
//   fill: "rgb(255 255 255 / 40%)",
// };

export default function NavHeader() {
  return (
    <div class="nav-header">
      <a
        onClick={(e) => {
          e.preventDefault();
          xurl.back();
        }}
      >
        <div class="goback">&#10094;</div>
      </a>

      <a
        onClick={(e) => {
          e.preventDefault();
          xurl.goto("/" + xurl.host);
        }}
      >
        <div style={{ flex: "auto" }}>{xurl.host}</div>
      </a>

      {
        /* <a
        onClick={(e) => {
          e.preventDefault();
          xurl.goto("/");
        }}
      >
        <Icon {...iconProps} />
      </a> */
      }
    </div>
  );
}
