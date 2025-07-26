import { createRoot, hydrateRoot } from "react-dom/client";

export const hydrate = async (element: HTMLElement) => {
    const { MfApp } = await import("./App");
    hydrateRoot(element, <MfApp />);
}

export const render = async (element: HTMLElement) => {
    const { MfApp } = await import("./App");
    createRoot(element).render(<MfApp />);
}