import { uiTranslations } from "fumadocs-ui/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { i18n } from "@/lib/i18n";

import { appName, gitConfig } from "./shared";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add("ui", {
    en: {
      displayName: "English",
      search: "Search",
    },
    pt: {
      displayName: "Português",
      search: "Buscar",
    },
  });

export function baseOptions(_locale: string): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
