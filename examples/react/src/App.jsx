import { startJellyfy } from "jellyfy";
import { useEffect, useState } from "react";

import Customize from "./customize.jsx";
import Home from "./home.jsx";

const getPage = () =>
  window.location.hash.startsWith("#/customize") ? "customize" : "home";

export default function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    startJellyfy();
    const navigate = () => {
      setPage(getPage());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);

  return (
    <>
      <nav aria-label="Example pages" className="border-b border-neutral-300">
        <div className="mx-auto flex w-full max-w-6xl gap-2 px-6 py-4">
          {[
            ["home", "Home", "#/"],
            ["customize", "Customize", "#/customize"],
          ].map(([id, label, href]) => (
            <a
              key={id}
              href={href}
              aria-current={page === id ? "page" : undefined}
              className={
                page === id
                  ? "rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white"
                  : "rounded-lg px-4 py-2 font-semibold text-neutral-600 hover:bg-neutral-200"
              }
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
      {page === "customize" ? <Customize /> : <Home />}
    </>
  );
}
