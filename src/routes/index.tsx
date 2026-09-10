import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-[calc(100vh-140px)] items-center justify-center">
      <h1 className="text-2xl font-semibold">Vite React Starter</h1>
    </main>
  );
}
