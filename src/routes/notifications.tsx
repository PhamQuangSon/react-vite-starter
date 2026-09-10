import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
});

function Notifications() {
  return (
    <main className="flex min-h-[calc(100vh-140px)] items-center justify-center">
      <h1 className="text-2xl font-semibold">Notifications</h1>
    </main>
  );
}
