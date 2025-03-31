import type { JSX } from "preact";
import "./codicon.css";
import type { CodiconClasses } from "./types.ts";

export interface CodIconParams {
  name: keyof CodiconClasses;
  style?: JSX.CSSProperties;
  size?: JSX.CSSProperties["fontSize"];
}

export default function CodIcon(params: CodIconParams) {
  if (params.size) {
    params.style = params.style || {};
    params.style.fontSize = params.size;
  }

  return (
    <i
      class={"codicon codicon-" + params.name}
      style={params.style}
      aria-hidden="true"
    >
    </i>
  );
}
