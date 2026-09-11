import { Suspense, useEffect } from "react";

import { useThemeStore } from "@/store/themeStore";
import { Router, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

import "./App.css";

const router = new Router({ routeTree });

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-sm font-medium text-gray-500">
          Đang khởi tạo ứng dụng...
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
