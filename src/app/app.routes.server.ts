import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic-ID routes can't be prerendered at build time (the IDs come
  // from Firestore and change independently of the app build), and
  // there's no Node server in production to render them on demand
  // (AwardSpace/Apache hosting) — so these render client-side, same as
  // any other SPA route, relying on .htaccess to serve index.html.
  {
    path: 'cosplay/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'tutorials/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
