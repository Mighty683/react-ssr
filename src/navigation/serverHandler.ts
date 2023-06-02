import { createStaticHandler } from "react-router-dom/server";
import { routes } from "./routes";

export const staticHandler = createStaticHandler(routes);
