# firecloak-web → firecloak-cos-web Migration Plan

Source: `firecloak-web` (Angular 11, NgModules, Bootstrap 4/jQuery, AngularFire 5)
Target: `firecloak-cos-web` (Angular 22, standalone + signals, SSR-scaffolded)

This is a living document. Check off steps as we finish them, and edit freely — it's yours.

## Decisions made so far

- **Workflow**: plan first, then one step at a time, reviewing/editing as we go.
- **Styling**: undecided — we'll evaluate per page rather than committing up front (see below).
- **Firebase**: keep the same Firebase project (`firecloak-ea9aa`), but re-integrate using the modern modular `@angular/fire` API instead of the old `NgModule`-based one. Details below.
- **SSR**: undecided — pros/cons below, your call.

### SSR pros/cons (for a public cosplay portfolio/blog site)

**Keep SSR:**
- Real HTML is sent on first load, so search engines and link-preview bots (Discord, Twitter/X, Facebook) see actual content — good for a site fans will share links to.
- Faster perceived load (content visible before JS finishes downloading), especially on mobile.
- Angular's `provideClientHydration()` makes this mostly "free" once set up; the scaffolding is already in your project.

**Cons / cost:**
- You need a Node server running (or prerendering at build time) instead of just static files on cheap static hosting — Firebase Hosting supports this but it's an extra moving part (Cloud Functions/Cloud Run under the hood).
- Any code that touches `window`, `document`, `localStorage`, etc. needs guards for the server environment (`isPlatformBrowser`), which matters here since the old app uses jQuery/Bootstrap plugins that assume a browser.
- Slightly more complex debugging (two runtimes: server + browser).

**My recommendation**: since this is a fan-facing site where shareable links and SEO matter, and Angular 22's SSR/hydration is low-effort once scaffolded (which it already is), keep it — but we can also **prerender** (static-generate) the mostly-static pages (home, about, links, host) at build time instead of running a live Node server, which gets you the SEO/preview benefits without hosting a server. We'll decide per-route in Step 3. If it ever becomes a hassle, ripping out SSR later is a one-line change to `angular.json` + deleting `server.ts`/`main.server.ts`.

### Firebase re-integration notes

Old app used `@angular/fire` v5 with `AngularFireModule.initializeApp()`, `AngularFirestoreModule`, `AngularFireAnalyticsModule` — all `NgModule`-based, tied to Angular 11.

For Angular 22 we'll use the current `@angular/fire` (v9+, modular/functional):
- `provideFirebaseApp(() => initializeApp(environment.firebase))`
- `provideFirestore(() => getFirestore())`
- `provideAnalytics(() => getAnalytics())` (guarded for SSR — analytics only runs in the browser)

Your existing Firebase project config (apiKey, projectId `firecloak-ea9aa`, etc.) carries over unchanged — same project, just a newer client SDK talking to it. No changes needed on the Firebase console side. The Cloud Functions (SendGrid email on contact form) live in `functions/` and are independent of the Angular app version, but we should bump their Node runtime since Firebase deprecates old runtimes on a schedule — we'll check the current supported version when we get to Step 7.

## Migration order

1. **Project foundation** — environments + Firebase providers, global SCSS variables/mixins, icons/fonts, confirm lint/format tooling.
2. **Shared components** — `header`, `footer`, `spinner`, `spacer`, `cosplay-gallery`, converted to standalone signal-based components.
3. **Routing skeleton** — lazy-loaded routes for every page (home, about, contact, cosplay, cosplay/:id, tutorial, tutorial/:id, host, links, error/wildcard), deciding prerender vs SSR vs CSR per route.
4. **Data layer** — models (`contact-form`, `cosplay-details`, `tutorial`) and `data.service.ts`, rewritten against modular Firestore + signals instead of RxJS-heavy patterns where it simplifies things.
5. **Page-by-page migration**, roughly simplest → most complex:
   - Home
   - About
   - Links
   - Host
   - Contact (form + Cloud Function submission)
   - Cosplay (list)
   - Cosplay detail (gallery)
   - Tutorial (list)
   - Tutorial detail
   - Error / 404
6. **Cross-cutting polish** — per-route SEO/meta tags, Analytics wiring, PWA/service worker (`ngsw-config.json` equivalent), scroll-to-top behavior, and an accessibility pass (AXE + WCAG AA) across all migrated pages.
7. **Backend & deploy** — update Cloud Functions runtime, `firebase.json`/`.firebaserc` for the new build output path, and a cutover plan (Firebase preview channel → swap production).

## Working agreement

- We do one step at a time. I build it, you look it over and edit anything you want, then we move to the next step.
- Every new component: standalone, signals for state, `input()`/`output()`, native control flow (`@if`/`@for`), `inject()` over constructor injection — per your best-practices doc.
- I'll flag anywhere the old app relied on jQuery/Bootstrap-4-specific behavior so we can decide the replacement together instead of me silently picking one.
