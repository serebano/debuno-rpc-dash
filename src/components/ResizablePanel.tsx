// deno-lint-ignore-file no-window-prefix no-window
import { type Signal, useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import "./ResizablePanel.css";

type ResizablePanelProps = {
  size: Signal<number>; // width or height
  direction: "horizontal" | "vertical"; // resize axis
  minSize?: number;
  maxSize?: number;
  children: JSX.Element | JSX.Element[];
};

export function ResizablePanel({
  size,
  direction,
  minSize = 100,
  maxSize = 1000,
  children,
}: ResizablePanelProps) {
  const isResizing = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRect = useRef<DOMRect>(null);
  const $isResizing = useSignal(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const rect = containerRect.current;

      if (direction === "horizontal") {
        size.value = Math.min(
          Math.max(e.clientX - (rect?.left || 0), minSize),
          maxSize,
        );
      } else {
        size.value = Math.min(
          Math.max(e.clientY - (rect?.top || 0), minSize),
          maxSize,
        );
      }
    };

    const onMouseUp = () => {
      isResizing.current = false;
      $isResizing.value = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [direction, size]);

  const isHorizontal = direction === "horizontal";

  const panelStyle = isHorizontal
    ? {
      width: `${size.value}px`,
      height: "100%",
      overflow: "auto",
      transition: "opacity 0.2s ease-out",
      opacity: $isResizing.value ? 0.5 : 1,
    }
    : {
      height: `${size.value}px`,
      width: "100%",
      overflow: "auto",
      transition: "opacity 0.2s ease-out",
      opacity: $isResizing.value ? 0.5 : 1,
    };

  const handleClass = isHorizontal
    ? "col-resize-handler"
    : "row-resize-handler";

  const containerStyle = isHorizontal
    ? { display: "flex", height: "100%" }
    : { display: "block", width: "100%" };

  const handler = (
    <div
      class={handleClass}
      onMouseDown={() => {
        isResizing.current = true;
        $isResizing.value = true;
        containerRect.current = containerRef.current?.getBoundingClientRect() ||
          null;
        console.log("setting rect", containerRect.current);
      }}
    />
  );

  return (
    <div style={containerStyle} ref={containerRef}>
      <div style={{ ...panelStyle, boxSizing: "border-box" }}>
        {children}
      </div>
      {handler}
    </div>
  );
}
