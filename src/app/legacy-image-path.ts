const ASSETS_PREFIX = /^assets\//;

/**
 * Every image path still sitting in Firestore was authored by the old
 * app, e.g. "assets/cosplay/{id}/1.jpg". The new app serves images
 * straight from the public root (no "assets/" folder), so every path
 * coming out of Firestore needs this prefix stripped before use —
 * rather than migrating every document.
 */
export function stripAssetsPrefix(path: string | undefined): string | undefined {
  return path?.replace(ASSETS_PREFIX, '');
}
