export default function Icon(init?: {
  padding?: number;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
  height?: string | number;
  width?: string | number;
  size?: number;
  bgColor?: string;
  bgPadding?: number;
}) {
  init = init || {};
  init.fill = init.fill || "rgba(0 0 0 / 50%)";
  init.size = init.size || 512;
  init.height = init.height || init.size;
  init.width = init.width || init.size;
  init.padding = init.padding || 0;
  init.strokeWidth = init.strokeWidth || 0;
  init.bgColor = init.bgColor || "rgba(32 34 39 / 100%)";
  init.stroke = init.stroke || init.bgColor;
  init.bgPadding = init.bgPadding || 0;

  const a = (p: number) => (490 * p / 100);
  const b = (p: number) => (a(p) * 2) + 490;
  const _a = -a(init.padding);
  const _b = b(init.padding);

  const viewBox = [_a, _a, _b, _b].join(" ");

  const t = (p: number) => (245 * p / 100);

  const translate = t(init.bgPadding);
  const scale = 1 - (init.bgPadding / 100);

  return (
    <svg
      fill={init.fill}
      stroke={init.stroke}
      height={init.height}
      width={init.width}
      stroke-width={init.strokeWidth}
      stroke-linecap="round"
      viewBox={viewBox}
      version="1.1"
      id="debuno"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
    >
      <g
        id="debuno-bg"
        stroke-width="0"
        transform={`translate(${translate},${translate}), scale(${scale})`}
      >
        <rect
          x={_a}
          y={_a}
          width={_b}
          height={_b}
          rx={_b / 2}
          fill={init.bgColor}
          strokeWidth="0"
        >
        </rect>
      </g>
      <g id="debuno-dots">
        <g>
          <circle cx="245" cy="102" r="102" />
          <circle cx="365" cy="323" r="102" />
          <circle cx="125" cy="323" r="102" />
        </g>
      </g>
    </svg>
  );
}

export function svg(init?: {
  padding?: number;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
  height?: string | number;
  width?: string | number;
  size?: number;
  bgColor?: string;
  bgPadding?: number;
}) {
  init = init || {};
  init.fill = init.fill || "rgba(0 0 0 / 50%)";
  init.size = init.size || 512;
  init.height = init.height || init.size;
  init.width = init.width || init.size;
  init.padding = init.padding || 0;
  init.strokeWidth = init.strokeWidth || 0;
  init.bgColor = init.bgColor || "rgba(32 34 39 / 100%)";
  init.stroke = init.stroke || init.bgColor;
  init.bgPadding = init.bgPadding || 0;

  const a = (p: number) => (490 * p / 100);
  const b = (p: number) => (a(p) * 2) + 490;
  const _a = -a(init.padding);
  const _b = b(init.padding);

  const viewBox = [_a, _a, _b, _b].join(" ");

  const t = (p: number) => (245 * p / 100);

  const translate = t(init.bgPadding);
  const scale = 1 - (init.bgPadding / 100);

  return `<svg 
    fill="${init.fill}" 
    stroke="${init.stroke}"
    height="${init.height}" 
    width="${init.width}" 
    stroke-width="${init.strokeWidth}"
    stroke-linecap="round"
    viewBox="${viewBox}" 
    version="1.1" 
    id="debuno" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xml:space="preserve">
    <g id="debuno-bg" 
        stroke-width="0" 
        transform="translate(${translate},${translate}), scale(${scale})">
        <rect 
            x="${_a}" 
            y="${_a}" 
            width="${_b}" 
            height="${_b}" 
            rx="${_b / 2}" 
            fill="${init.bgColor}" 
            strokewidth="0">
        </rect>
    </g>
    <g id="debuno-dots">
        <g>
            <circle cx="245" cy="102" r="102"/>
            <circle cx="365" cy="323" r="102"/>
            <circle cx="125" cy="323" r="102"/>
        </g>
    </g>
</svg>`.trim();
}

// export function dataURI(...args: Parameters<typeof svg>) {
//   return `data:image/svg+xml;base64,${btoa(svg(...args))}`;
// }

// export default { svg, dataURI };

// async function dev() {
//   const { writeFile } = await import("node:fs/promises");
//   await writeFile(
//     import.meta.dirname + "/icon.svg",
//     svg({
//       padding: 20,
//       bgPadding: 15,
//       bgColor: "white",
//       fill: "black",
//       strokeWidth: 20,
//       size: 256,
//     }),
//   );
// }

// dev()
