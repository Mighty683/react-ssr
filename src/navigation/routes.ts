import { RouteObject } from "react-router-dom";

import { lazy } from "react";
import { serverRoutes } from "./serverRouter";

export const routes: RouteObject[] = serverRoutes.map<RouteObject>(
  (serverRoute) =>
    ({
      ...serverRoute,
      Component: lazy(() =>
        serverRoute.getComponent().then((pageComponent) => ({
          default: pageComponent,
        }))
      ),
    } as RouteObject)
);
