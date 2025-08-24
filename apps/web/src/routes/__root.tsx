import Header from "@/components/header";
import Loader from "@/components/loader";
import { Toaster } from "@/components/ui/sonner";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Grammar-Hero",
      },
      {
        name: "description",
        content: "Grammar-Hero is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  return (
    <>
      <HeadContent />

      <div className="grid grid-rows-[auto_1fr] h-svh">
        <Header />
        {isFetching ? <Loader /> : <Outlet />}
      </div>
      <Toaster richColors />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
