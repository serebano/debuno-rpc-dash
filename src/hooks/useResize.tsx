import { computed, type Signal } from "@preact/signals";
import { useMemo } from "preact/hooks";

export const useResize = ({
  width,
  minWidth = 0,
  maxWidth = Number.MAX_SAFE_INTEGER,
}: { width: Signal<number>; minWidth: number; maxWidth: number }) =>
  useMemo(() => {
    const onMouseDown = (e: MouseEvent) => {
      const { pageX: startX } = e;
      const startWidth = width?.value;

      const updater = (e: MouseEvent) => (width.value = Math.max(
        minWidth,
        Math.min(maxWidth, startWidth + e.pageX - startX),
      ));

      // setup listener to compute and update the width
      window.addEventListener("mousemove", updater);

      // setup listener which will remove the update listener
      window.addEventListener(
        "mouseup",
        () => window.removeEventListener("mousemove", updater),
        { once: true },
      );

      // prevent any other interaction during resize
      e.preventDefault();
      e.stopPropagation();
    };

    // this is the trick, computed signal which we can then
    // pass directly to the style prop
    const style = computed(() => `width: ${width.value}px`);

    const resizeHandle = (
      <div
        class="absolute right-0 inset-y-0 w-2 cursor-col-resize"
        onMouseDown={onMouseDown}
      />
    );

    return { style, resizeHandle, onMouseDown };
  }, [width, minWidth, maxWidth]);
