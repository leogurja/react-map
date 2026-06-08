"use client";

import { SingleSelectMap } from "@gurgelio/react-map";
import { brazil, type BrazilStates } from "@gurgelio/react-map/maps";
import { useParams } from "next/navigation";
import { useState } from "react";

import { getDemoMessages } from "@/lib/demo-messages";

export function SimpleDemo() {
  const { lang } = useParams<{ lang: string }>();
  const messages = getDemoMessages(lang ?? "en");
  const [state, setState] = useState<BrazilStates | null>(null);

  return (
    <div className="space-y-3">
      <div className="w-full rounded-lg border bg-fd-card p-2">
        <SingleSelectMap
          map={brazil}
          value={state}
          onChange={setState}
          pathStyle={({ isSelected, isHovered }) => ({
            strokeWidth: 1,
            fill: isSelected
              ? "var(--color-emerald-500)"
              : isHovered
                ? "var(--color-emerald-300)"
                : "white",
            strokeColor: "var(--color-fd-card)",
          })}
          strokeWidth={1}
        />
      </div>
      <p className="text-sm text-fd-muted-foreground">
        {messages.selected}: {state ?? messages.none}
      </p>
    </div>
  );
}
