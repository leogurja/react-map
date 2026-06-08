import { Route } from "next";
import Link from "next/link";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const docsHref = lang === "en" ? "/docs" : `/${lang}/docs`;

  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-3xl font-bold">@gurgelio/react-map</h1>
      <p className="mx-auto max-w-lg text-fd-muted-foreground">
        Interactive SVG maps for React — single and multi-select, custom colors, hints, and your own
        geometries.
      </p>
      <p className="mt-6">
        <Link href={docsHref as Route} className="font-medium underline">
          {lang === "pt" ? "Abrir documentação" : "Open documentation"}
        </Link>
      </p>
    </div>
  );
}
