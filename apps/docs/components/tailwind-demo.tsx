"use client";

import { SingleSelectMap } from "@gurgelio/react-map";
import world, { type WorldStates } from "@gurgelio/react-map/world";
import { useState } from "react";

export function TailwindDemo() {
  const [country, setCountry] = useState<WorldStates | null>(null);

  return (
    <div className="aspect-2/1 w-full max-w-3xl rounded-lg border bg-fd-card p-2">
      <SingleSelectMap
        map={world}
        value={country}
        onChange={setCountry}
        pathClassName="transition-colors duration-200 fill-slate-200 stroke-slate-400 hover:fill-sky-300 data-selected:fill-sky-600 data-selected:stroke-sky-800"
      />
    </div>
  );
}
