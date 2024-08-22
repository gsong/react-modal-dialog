import type { MetaFunction } from "@remix-run/react";

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

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
              <a href="/demo">Code sample in README</a>
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
            <li>
              <a href="/bake-off">Modal, dialog, popover bake-off</a>
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
