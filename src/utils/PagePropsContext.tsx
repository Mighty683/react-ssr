import { createContext, useContext } from "react";

export const PagePropsContext = createContext<any>({});

export function usePageProps<T>() {
  return useContext(PagePropsContext) as (T | undefined);
}