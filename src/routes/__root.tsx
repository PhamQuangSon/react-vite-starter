import Header from "@/layout/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

function RootComponent() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="pt-6 px-4 pb-16 lg:pt-8 lg:pb-24 dark:bg-gray-900 dark:text-white antialiased min-h-[calc(100vh-80px)] mx-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
