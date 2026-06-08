"use client";

import { MultiSelectMap } from "@gurgelio/react-map";
import world, { type WorldStates } from "@gurgelio/react-map/world";
import { useParams } from "next/navigation";
import { useState } from "react";

import { CountryHint } from "@/components/country-hint";
import { countryStats } from "@/lib/country-stats";
import { getDemoMessages } from "@/lib/demo-messages";
import { hdiToColor } from "@/lib/hdi-to-color";

export function KitchenSinkDemo() {
  const { lang } = useParams<{ lang: string }>();
  const messages = getDemoMessages(lang ?? "en");
  const [selected, setSelected] = useState<WorldStates[]>([]);

  return (
    <div className="space-y-3">
      <div className="aspect-2/1 w-full max-w-3xl rounded-lg border bg-fd-card p-2">
        <MultiSelectMap
          map={world}
          value={selected}
          onChange={setSelected}
          HintComponent={CountryHint}
          pathStyle={({ state, isSelected, isHovered }) => {
            const hdi = countryStats[state]?.hdi;
            const fill = isSelected ? "#2563eb" : isHovered ? "#93c5fd" : hdiToColor(hdi);

            return { fill, strokeWidth: 0.75, stroke: isSelected ? "#1e3a8a" : "#94a3b8" };
          }}
        />
      </div>
      <p className="text-sm text-fd-muted-foreground">
        {messages.multi}: {selected.length > 0 ? selected.join(", ") : messages.none}
      </p>
    </div>
  );
}
