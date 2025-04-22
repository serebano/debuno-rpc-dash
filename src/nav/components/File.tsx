import { fileTypeClass } from "../utils.ts";
import type { FileProps } from "../types.ts";
// import { xurl } from "@signals";

export function File({ name, url, currentUrl }: FileProps) {
  const isSelected = currentUrl?.startsWith(url);

  const onClick = (e: Event) => {
    e.preventDefault();
    location.hash = url;
    // xurl.goto(url);
  };

  return (
    <li class={`file ${fileTypeClass(name)} ${isSelected ? "selected" : ""}`}>
      <div>
        <span class="label">
          <a class="link" title={url} href={url} onClick={onClick}>{name}</a>
        </span>
      </div>
    </li>
  );
}
