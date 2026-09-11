import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/error")({
  component: Error,
});

function Error() {
  return (
    <section className="bg-gray-50 text-white text-center">
      <div className="grid h-screen place-content-center bg-white dark:bg-gray-900 px-4">
        <div className="text-center">
          <h2 className="uppercase tracking-widest text-gray-500">
            404 | Not Found
          </h2>
          <button
            className="mt-6 inline-block rounded bg-rose-200 px-5 py-3 text-sm font-medium text-white hover:bg-rose-400 focus:border-rose-600 focus:ring"
            onClick={() => (location.href = "/")}
          >
            Back To Home
          </button>
        </div>
      </div>
    </section>
  );
}
