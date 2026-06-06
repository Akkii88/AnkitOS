import { createContext, useContext } from "react";

interface BrowserContextValue {
  openBrowser: (url: string) => void;
}

export const BrowserContext = createContext<BrowserContextValue>({
  openBrowser: () => {},
});

export function useBrowser() {
  return useContext(BrowserContext);
}

export function isLinkedIn(url: string) {
  return /linkedin\.com/i.test(url);
}

export function shouldOpenInBrowser(url: string) {
  return !isLinkedIn(url);
}
