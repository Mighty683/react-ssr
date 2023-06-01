import ReactDOM from "react-dom/client";
import { browserRouter } from "./config/browserRouter";
import { RouterProvider } from "react-router-dom";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <RouterProvider router={browserRouter} />
);