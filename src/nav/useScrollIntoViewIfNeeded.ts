// useScrollIntoViewIfNeeded.ts
import { useRef, useCallback } from 'preact/hooks';
import { useScrollContainer } from './scroll-container-context.ts';

export function useScrollIntoViewIfNeeded<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const container = useScrollContainer();

    const scrollIfNeeded = useCallback(() => {
        const el = ref.current;
        const scrollEl = container ?? el?.parentElement;
        if (!el || !scrollEl) return;

        const elRect = el.getBoundingClientRect();
        const containerRect = scrollEl.getBoundingClientRect();

        const isVertVisible =
            elRect.top >= containerRect.top &&
            elRect.bottom <= containerRect.bottom;

        const isHorizVisible =
            elRect.left >= containerRect.left &&
            elRect.right <= containerRect.right;

        if (!isVertVisible || !isHorizVisible) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }, [container]);

    return [ref, scrollIfNeeded] as const;
}