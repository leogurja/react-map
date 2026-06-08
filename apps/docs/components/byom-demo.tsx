"use client";

import { SingleSelectMap } from "@gurgelio/react-map";
import { useState } from "react";

const demoRegions = {
  North: "M20,20 L80,20 L80,50 L20,50 Z",
  Central: "M20,55 L80,55 L80,85 L20,85 Z",
  South: "M20,90 L80,90 L80,120 L20,120 Z",
} as const;

type DemoRegion = keyof typeof demoRegions;

export function ByomDemo() {
  const [region, setRegion] = useState<DemoRegion | null>(null);

  return (
    <div className="space-y-3">
      <div className="mx-auto aspect-4/3 w-full max-w-md rounded-lg border bg-fd-card p-4">
        <SingleSelectMap
          map={demoRegions}
          value={region}
          onChange={setRegion}
          pathClassName="fill-slate-200 stroke-slate-400 hover:fill-sky-300 data-[selected=true]:fill-sky-600"
        />
      </div>
      <p className="text-center text-sm text-fd-muted-foreground">{region ?? "—"}</p>
    </div>
  );
}
