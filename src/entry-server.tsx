import { renderToString } from "react-dom/server";

export const renderMicrofrontend = async (props?: Record<string, string>) => {
    const { MfApp } = await import("./App");
    return renderToString(<MfApp serverData={props} />);
}