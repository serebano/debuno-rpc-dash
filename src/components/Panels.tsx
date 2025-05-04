import type { JSX } from "preact/jsx-runtime";
import type { Signal } from "@preact/signals";
import { useHotKey } from "../hooks/useHotKey.ts";
import { ResizablePanel } from "./ResizablePanel.tsx";
import { useElementSize } from "../hooks/useElementSize.ts";
import { useEffect, useRef } from "preact/hooks";
import type { RefObject } from "preact";

export type PanelComponent = ((params: any) => JSX.Element | JSX.Element[]) & {
  enabled: Signal<boolean>;
  hotkey?: string;
  size: Signal<number>;
};
export type PanelsParams = {
  type: "col" | "row";
  panels: PanelComponent[];
  rect?: Signal<DOMRect | undefined>;
  size?: Signal<number | undefined>;
  onResize?: (size: { width: number; height: number }) => void;
};

export function Panels(params: PanelsParams) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const enabledPanels = params.panels.filter((p) => p.enabled.value === true);
  // const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // if (params.size) {
    //   params.size.value = params.type === "row" ? size.width : size.height;
    // }
    if (params.type === "row") {
      const [last, ...rest] = enabledPanels.toReversed();
      const panelsSize = rest.map((p) => p.size.peek()).reduce(
        (a, b) => a + b,
        0,
      );
      const lastSize = last.size.peek();
      console.log("row last", size.width, panelsSize, lastSize);
      if (lastSize !== (size.width - panelsSize)) {
        // last.size.value = size.width - panelsSize;
      }
    }
    // params.onResize?.(size);
  }, [size.width, size.height]);

  //   console.log(params.type, rect);
  //   if (params.type === "row" && rect?.width) {
  //     const x = rect?.width / enabledPanels.length;
  //     console.log("xxxx", rect?.width, x);
  //     for (const panel of enabledPanels) {
  //       console.log("ppp", panel.size.value, x);

  //       panel.size.value = x;
  //     }
  //   }
  //   // }
  //   // console.log({ ref });
  // });

  for (const panel of params.panels) {
    if (panel.hotkey) {
      useHotKey(panel.hotkey, () => {
        panel.enabled.value = !panel.enabled.value;
      }, { preventDefault: true });
    }
  }

  const inner = enabledPanels.map((Panel, index) => {
    const isLast = index === enabledPanels.length - 1;
    if (isLast) {
      return (
        <div style="width: 100%; height: 100%;position: relative">
          <div class="panel-info">
            {params.type} {`${Panel.name}[${Panel.size.value}] Rest`}
          </div>
          <Panel key={Panel.name + index} />
        </div>
      );
    }

    return (
      <ResizablePanel
        key={Panel.name + index}
        size={Panel.size}
        direction={params.type === "col" ? "vertical" : "horizontal"}
      >
        <div class="panel-info">
          {params.type} {`${Panel.name}[${Panel.size.value}]`}
        </div>
        <Panel />
      </ResizablePanel>
    );
  });

  return (
    <div class={`${params.type}-panel`} ref={ref}>
      {inner}
    </div>
  );
}
