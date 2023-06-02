import { useState } from "react";
import { Page } from "../utils/types";
import { usePageProps } from "../utils/PagePropsContext";

export const HomePage: Page = () => {
  const props = usePageProps<{ counter?: number }>();
  const [ counter, setCounter ] = useState(props?.counter || 0);
  return <div>Home page <div onClick={() => setCounter(prev => prev + 1)}>{counter}</div></div>;
}

HomePage.getServerSideData = async () => {
  return {
    counter: 20
  };
}