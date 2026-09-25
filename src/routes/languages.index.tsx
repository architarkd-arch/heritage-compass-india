import { createFileRoute, Link } from "@tanstack/react-router";
import { languages } from "@/lib/data";
import { PageTitle, card } from "@/components/Shell";

export const Route = createFileRoute("/languages/")({
  head: () => ({ meta: [{ title: "Language Explorer — Heritage Compass" }, { name: "description", content: "Learn scripts, sounds and words of Indian languages with flashcards and quizzes." }, { property: "og:title", content: "Language Explorer" }, { property: "og:description", content: "Explore Santali, Hindi, Tamil and more." }] }),
  component: () => (
    <div>
      <PageTitle title="Language Explorer" sub="All lessons come from reviewed records — nothing is generated live." />
      <div className="grid gap-4 sm:grid-cols-3">
        {languages.map((l) => (
          <Link key={l.code} to="/languages/$code" params={{ code: l.code }} className={`${card} hover:border-primary`}>
            <p className="font-display text-4xl text-primary">{l.native}</p>
            <h2 className="mt-2 text-lg font-semibold">{l.name}</h2>
            <p className="text-sm text-muted-foreground">{l.script} script · {l.family} · {l.speakers}</p>
          </Link>
        ))}
      </div>
    </div>
  ),
});
