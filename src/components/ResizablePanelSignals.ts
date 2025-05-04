import { signal } from "@preact/signals";

const defWidth = (innerWidth - 250) / 2

export const sidebarWidth = signal(250);
export const generatedWidth = signal(defWidth);
export const previewWidth = signal(defWidth);

export const infoPanelHeight = signal(350);
