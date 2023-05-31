import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/Home";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <HomePage />
);