import ReactDOM from "react-dom/client";
import { browserRouter } from "./navigation/browserRouter";
import { RouterProvider } from "react-router-dom";
import { PagePropsContext } from "./utils/PagePropsContext";

if (import.meta.env.DEV) {
  ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  ).render(
    <PagePropsContext.Provider value={window.__PAGE_PROPS__}>
      <RouterProvider router={browserRouter} />
    </PagePropsContext.Provider>
  );
} else {

  ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <PagePropsContext.Provider value={window.__PAGE_PROPS__}>
      <RouterProvider router={browserRouter} />
    </PagePropsContext.Provider>
  );
}