import { hydrateRoot } from "react-dom/client";
// 
export const hydrate = async (element: HTMLElement, data?: Record<string, string>) => {
    const { MfApp } = await import("./App");
    hydrateRoot(element, <MfApp serverData={data} />);
}