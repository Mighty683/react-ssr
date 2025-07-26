import { renderToString } from "react-dom/server";

export const renderMicrofrontend = async () => {
    const { MfApp } = await import("./App");
    return renderToString(<MfApp />);
}