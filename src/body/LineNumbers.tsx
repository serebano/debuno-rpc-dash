import { connect } from "@connect";

export function LineNumbers(params?: { source?: "original" | "generated" }) {
  params = params || {};
  params.source = params.source || "original";

  const source = connect.file.value?.sources?.[params.source]?.contents || "";
  const file = connect.file.value!;

  const lineNumber = 1;
  return (
    <div class="lines-mask">
      {source.split("\n")
        .map((_, index) => (
          <a
            key={index}
            id={`lnr-${index + 1}`}
            class={`${index === lineNumber - 1 ? "selected" : ""}`}
            title={`Edit line ${index + 1}`}
            href={`${file.http}:${index + 1}`}
            onClick={(e) => {
              e.preventDefault();
              file.open({
                line: index + 1,
                type: params.source === "generated" ? "gen" : "src",
                format: connect.file.value?.lang === "javascript" ? "js" : "ts",
              });
            }}
          >
            {index + 1}
          </a>
        ))}
    </div>
  );
}
