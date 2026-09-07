import { createFileRoute } from "@tanstack/react-router";
import { QuizGame } from "@/components/QuizGame";

const title = "Desafio do Patrimônio Audiovisual — Jogo de Perguntas";
const description =
  "Jogo de perguntas e respostas em estilo game show sobre patrimônio audiovisual: 10 perguntas, suspense, som e a escada até R$ 1.000.000.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <QuizGame />;
}
