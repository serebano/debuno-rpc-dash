// scroll-container-context.ts
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export const ScrollContainerContext = createContext<HTMLElement | null>(null);

export function useScrollContainer() {
    return useContext(ScrollContainerContext);
}