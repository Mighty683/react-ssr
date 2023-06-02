import { useState } from "react";
import { Page } from "../utils/types";

export const HomePage: Page = () => {
  const [ counter, setCounter ] = useState(0);
  return <div>Home page <div onClick={() => setCounter(prev => prev + 1)}>{counter}</div></div>;
}

HomePage.getServerSideData = async () => {
  console.log('getting home data');
}