import { useCallback } from "react";
import { useBrowser, shouldOpenInBrowser, BrowserContext } from "./BrowserContext";

export { useBrowser, BrowserContext, shouldOpenInBrowser };

export function InBrowserLink({
  href,
  className,
  children,
  style,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { openBrowser } = useBrowser();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href && shouldOpenInBrowser(href)) {
        e.preventDefault();
        openBrowser(href);
      }
      onClick?.(e);
    },
    [href, openBrowser, onClick]
  );

  return (
    <a href={href} className={className} style={style} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
