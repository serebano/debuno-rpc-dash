import { useEffect, useRef } from "preact/hooks";
import hljs from "https://esm.sh/highlight.js@11.11.1/lib/core";
import "./register.ts";

export default function CodeBlock(
  { code, language }: { code: string; language: string },
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      hljs.highlightElement(ref.current);
    }
  }, [code, language]);

  return (
    <pre>
      <code ref={ref} class={language}>
        {code}
      </code>
    </pre>
  );
}
