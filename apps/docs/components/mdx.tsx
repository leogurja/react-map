import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { ByomDemo } from "@/components/byom-demo";
import { CountryHint } from "@/components/country-hint";
import { KitchenSinkDemo } from "@/components/kitchen-sink-demo";
import { SimpleDemo } from "@/components/simple-demo";
import { TailwindDemo } from "@/components/tailwind-demo";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    SimpleDemo,
    TailwindDemo,
    KitchenSinkDemo,
    CountryHint,
    ByomDemo,
    ...components,
  } satisfies MDXComponents;
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
