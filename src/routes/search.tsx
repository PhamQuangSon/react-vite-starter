import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  component: Search,
});

function Search() {
  return (
    <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="text-center text-gray-500 dark:text-gray-400">
        Search is unavailable
      </h1>
    </main>
  );
}
