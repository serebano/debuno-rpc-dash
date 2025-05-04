import { Signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact";

type ResizableLayoutProps = {
  direction: "horizontal" | "vertical";
  size: Signal<number>;
  minSize?: number;
  maxSize?: number;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
  children: JSX.Element | JSX.Element[];
};

function ResizableLayout({
  direction,
  size,
  minSize = 100,
  maxSize = 1000,
  onResizeStart,
  onResizeEnd,
  children,
}: ResizableLayoutProps) {
  const isHorizontal = direction === "horizontal";
  const isResizing = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const pos = direction === "horizontal" ? e.clientX : e.clientY;
      const clamped = Math.min(Math.max(pos, minSize), maxSize ?? Infinity);
      size.value = clamped;
    };

    const onMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        onResizeEnd?.();
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [size]);

  const panelStyle = isHorizontal
    ? {
      width: `${size.value}px`,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }
    : { height: `${size.value}px`, width: "100%" };

  const handleStyle = isHorizontal
    ? { width: "5px", cursor: "col-resize", background: "#ccc" }
    : { height: "5px", cursor: "row-resize", background: "#ccc" };

  const containerStyle = isHorizontal
    ? { display: "flex", height: "100%" }
    : { display: "flex", flexDirection: "column", width: "100%" };

  const slotArray = Array.isArray(children) ? children : [children];
  const [resizableSlot, ...restSlots] = slotArray;

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>{resizableSlot}</div>
      <div
        style={handleStyle}
        onMouseDown={() => {
          isResizing.current = true;
          onResizeStart?.();
        }}
      />
      {restSlots}
    </div>
  );
}

// Slot = semantic sugar
ResizableLayout.Slot = function Slot({ children }: { children: JSX.Element }) {
  return <div style={{ flex: 1, overflow: "auto" }}>{children}</div>;
};

export { ResizableLayout };
