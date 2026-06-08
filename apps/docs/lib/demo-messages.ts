const demoMessages = {
  en: {
    selected: "Selected",
    none: "Click a country",
    multi: "Selected countries",
    hover: "Hover a region",
  },
  pt: {
    selected: "Selecionado",
    none: "Clique em um país",
    multi: "Países selecionados",
    hover: "Passe o mouse sobre uma região",
  },
} as const;

export function getDemoMessages(locale: string) {
  return demoMessages[locale === "pt" ? "pt" : "en"];
}
