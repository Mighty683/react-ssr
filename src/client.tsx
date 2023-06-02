import ReactDOM from "react-dom/client";
import { browserRouter } from "./navigation/browserRouter";
import { RouterProvider } from "react-router-dom";
import { PagePropsContext } from "./utils/PagePropsContext";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <PagePropsContext.Provider value={window.__PAGE_PROPS__}>
    <RouterProvider router={browserRouter} />
  </PagePropsContext.Provider>
);