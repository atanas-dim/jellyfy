import { startJellyfy } from "jellyfy";
import { useEffect } from "react";

import Home from "./home.jsx";

export default function App() {
  useEffect(() => {
    startJellyfy();
  }, []);

  return <Home />;
}
