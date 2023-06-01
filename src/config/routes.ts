import { RouteObject } from "react-router-dom";

import { lazy } from "react";
const HomePage = lazy(() => import("../pages/Home").then(module => ({ default: module.HomePage })));
const UserPage = lazy(() => import("../pages/User").then(module => ({ default: module.UserPage })));

export const routes: RouteObject[] = [
  {
    path: "*",
    Component: HomePage,
  },
  {
    path: "/user",
    Component: UserPage,
  },
];
