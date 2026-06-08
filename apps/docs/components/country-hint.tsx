"use client";

import type { HintProps } from "@gurgelio/react-map";
import type { WorldStates } from "@gurgelio/react-map/world";
import { useParams } from "next/navigation";

import { countryStats } from "@/lib/country-stats";
import { getDemoMessages } from "@/lib/demo-messages";
import { hdiToColor } from "@/lib/hdi-to-color";

function formatPopulation(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function CountryHint({ mouseX, mouseY, state }: HintProps<WorldStates>) {
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === "pt" ? "pt" : "en";
  const messages = getDemoMessages(locale);
  const stats = countryStats[state];

  if (!stats) {
    return (
      <div
        className="pointer-events-none fixed z-50 rounded-md border bg-fd-popover px-3 py-2 text-sm shadow-md"
        style={{ left: mouseX + 12, top: mouseY + 12 }}
      >
        <p className="font-medium">{state}</p>
        <p className="text-fd-muted-foreground text-xs">{messages.hover}</p>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed z-50 min-w-48 rounded-md border bg-fd-popover px-3 py-2 text-sm shadow-md"
      style={{ left: mouseX + 12, top: mouseY + 12 }}
    >
      <p className="font-medium">{state}</p>
      <dl className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-fd-muted-foreground">
        <dt>{locale === "pt" ? "População" : "Population"}</dt>
        <dd>{formatPopulation(stats.population, locale)}</dd>
        <dt>HDI</dt>
        <dd>{stats.hdi.toFixed(3)}</dd>
        <dt>{locale === "pt" ? "Área" : "Area"}</dt>
        <dd>{formatPopulation(stats.areaKm2, locale)} km²</dd>
      </dl>
      <div
        className="mt-2 h-1.5 w-full rounded-full"
        style={{ backgroundColor: hdiToColor(stats.hdi) }}
        title={`HDI ${stats.hdi}`}
      />
    </div>
  );
}
