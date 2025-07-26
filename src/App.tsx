import { useState } from "react";

export const MfApp = ({
  serverData
}: {
  serverData?: Record<string, string>;
}) => {
  const [counter, setCounter] = useState(20);
  return (
    <div id="react-microfrontend">
      <h1>Microfrontend App</h1>
      <p>This is a microfrontend application.</p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <p>Counter: {counter}</p>
      {serverData && <p>Server Data: {JSON.stringify(serverData)}</p>}
    </div>
  );
};