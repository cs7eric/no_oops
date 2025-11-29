import React, { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { Provider } from "@/provider";
import DefaultLayout from "@/layouts/default";

const IndexPage = React.lazy(() => import("@/pages/index"));
const ProjectPage = React.lazy(() => import("@/pages/project"));
const ResumePage = React.lazy(() => import("@/pages/resume"));
const BlogPage = React.lazy(() => import("@/pages/blog"));
const AboutPage = React.lazy(() => import("@/pages/about"));
const ReadingPage = React.lazy(() => import("@/pages/reading"));
const AIPage = React.lazy(() => import("@/pages/ai"));

const withSuspense = (
  Comp: React.LazyExoticComponent<React.ComponentType<any>>
) => (
  <Suspense fallback={<div className="py-10 text-center text-default-500">Loading...</div>}>
    <Comp />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Provider>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </Provider>
    ),
    children: [
      { index: true, element: withSuspense(IndexPage) },
      { path: "project", element: withSuspense(ProjectPage) },
      { path: "resume", element: withSuspense(ResumePage) }, 
      { 
        path: "blog", 
        element: withSuspense(BlogPage),
        children: [
          { path: ":id", element: withSuspense(BlogPage) }
        ]
      },
      { path: "reading", element: withSuspense(ReadingPage) },
      { path: "about", element: withSuspense(AboutPage) },
      { path: "ai", element: withSuspense(AIPage) },
      { path: "*", element: <div className="py-10 text-center text-default-500">404 - Page Not Found</div> }
    ]
  }
];