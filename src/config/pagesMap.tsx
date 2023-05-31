import React from "react";
import { HomePage } from "../pages/Home";

export type RouteConfig = {
  path: string;
  component: () => React.ReactElement;
};

export const pagesMap: RouteConfig[] = [{
  path: '/',
  component: () => <HomePage />,
}]