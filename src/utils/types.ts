import Express from "express";
import React from "react";
import { RouteObject } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
export type Page = React.FunctionComponent<any> & {
  getServerSideData?: (req: Express.Request) => Promise<any>;
};

export type RouteObjectServer = Omit<RouteObject, "Component"> & {
  getComponent: () => Promise<Page>;
};
