import { fileTypeClass } from "../utils.ts";
import type { FileProps } from "../types.ts";
import { useScrollIntoViewIfNeeded } from "../useScrollIntoViewIfNeeded.ts";
import { useEffect } from "preact/hooks";
import { connect } from "@connect/connect.ts";
// import { xurl } from "@signals";

export function File({ name, url, currentUrl }: FileProps) {
  const isSelected = connect.url.value === url; // currentUrl?.startsWith(url);
  const [ref, scrollIntoView] = useScrollIntoViewIfNeeded<HTMLAnchorElement>();

  const onClick = (e: Event) => {
    e.preventDefault();
    location.hash = url;
  };

  useEffect(() => {
    if (isSelected) {
      scrollIntoView();
    }
  }, [isSelected, scrollIntoView]);

  return (
    <li class={`file ${fileTypeClass(name)} ${isSelected ? "selected" : ""}`}>
      <div>
        <span class="label">
          <a ref={ref} class="link" title={url} href={url} onClick={onClick}>
            {name}
          </a>
        </span>
      </div>
    </li>
  );
}
