import { useEffect, useRef } from 'preact/hooks';

export function useFocusHotKey<T extends HTMLInputElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const active = document.activeElement;
            const isTyping =
                active instanceof HTMLInputElement ||
                active instanceof HTMLTextAreaElement ||
                (active instanceof HTMLElement && active.isContentEditable);

            const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
            const isSlash = e.key === '/';

            if (!isTyping && (isCmdK || isSlash)) {
                e.preventDefault();
                ref.current?.focus();
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return ref;
}