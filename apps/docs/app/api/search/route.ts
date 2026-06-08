import { createFromSource } from "fumadocs-core/search/server";
import type { NextRequest } from "next/server";

import { source } from "@/lib/source";

const indexes = {
  en: createFromSource(source, { language: "english" }),
  pt: createFromSource(source, { language: "portuguese" }),
} as const;

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") ?? "en";
  const handler = indexes[locale === "pt" ? "pt" : "en"];

  return handler.GET(request);
}
