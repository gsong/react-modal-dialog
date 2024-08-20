import type { MetaFunction } from "@remix-run/react";

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Modal Demo" },
    { name: "description", content: "@gsong/react-modal-dialog demo" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="p-4">
        <nav className="py-4">
          <ul className="flex gap-6">
            <li>
              <Link to="/demo">Code sample in README</Link>
            </li>
            <li>
              <Link to="/default">Default</Link>
            </li>
            <li>
              <Link to="/allow-body-scroll">Allow body scroll</Link>
            </li>
            <li>
              <Link to="/allow-dismiss">Allow dismiss</Link>
            </li>
          </ul>
        </nav>

        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
