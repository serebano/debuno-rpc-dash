import { useEffect, useCallback } from 'preact/hooks';

export function useHotKey(
    keyCombo: string,
    callback: (event: KeyboardEvent) => void,
    options: { preventDefault?: boolean } = {}
) {
    const handler = useCallback(
        (event: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes('MAC');
            const meta = isMac ? event.metaKey : event.ctrlKey;
            const alt = event.altKey;
            const shift = event.shiftKey;

            const combo = keyCombo.toLowerCase().split('+');
            const key = combo.find(k => !['cmd', 'ctrl', 'meta', 'shift', 'alt'].includes(k));
            const needsCmd = combo.includes('cmd') || combo.includes('ctrl') || combo.includes('meta');
            const needsAlt = combo.includes('alt');
            const needsShift = combo.includes('shift');

            if (
                key === event.key.toLowerCase() &&
                meta === needsCmd &&
                alt === needsAlt &&
                shift === needsShift
            ) {
                if (options.preventDefault) event.preventDefault();
                callback(event);
            }
        },
        [keyCombo, callback]
    );

    useEffect(() => {
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handler]);
}