import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <>
      <Header />
      <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <p className="text-sm font-medium text-muted-foreground">Error 404</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-foreground">Page not found</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Link to="/" className="btn-primary">Return Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kyvro Digital — Premium Websites for Modern Businesses" },
      {
        name: "description",
        content:
          "Kyvro Digital is a premium digital studio crafting clean, modern websites that help businesses look polished, trusted, and ready to grow.",
      },
      { name: "author", content: "Kyvro Digital" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Kyvro Digital — Premium Websites for Modern Businesses" },
      { name: "twitter:title", content: "Kyvro Digital — Premium Websites for Modern Businesses" },
      { name: "description", content: "Kyvro Digital creates premium websites, landing pages, booking systems, and quote forms for modern businesses looking to build a polished online presence" },
      { property: "og:description", content: "Kyvro Digital creates premium websites, landing pages, booking systems, and quote forms for modern businesses looking to build a polished online presence" },
      { name: "twitter:description", content: "Kyvro Digital creates premium websites, landing pages, booking systems, and quote forms for modern businesses looking to build a polished online presence" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1368454a-6c09-42fb-888e-6ddf0b9716d9/id-preview-2b990e92--3f79a3eb-80ee-41e7-9aec-c6696465c358.lovable.app-1777281321260.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1368454a-6c09-42fb-888e-6ddf0b9716d9/id-preview-2b990e92--3f79a3eb-80ee-41e7-9aec-c6696465c358.lovable.app-1777281321260.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
