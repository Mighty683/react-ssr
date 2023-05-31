import { useState } from "react";

export function HomePage() {
  const [ counter, setCounter ] = useState(0);
  return <div>Home page <div onClick={() => setCounter(prev => prev + 1)}>{counter}</div></div>;
}