import { ComponentType } from "react";
import { Page } from "./types";

export function isPage(page: ComponentType): page is Page {
  return typeof (page as any)?.getServerSideData === "function";
}
