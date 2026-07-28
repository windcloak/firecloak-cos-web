import { Service, effect, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'firecloak-dark-mode';

// Tracks light/dark mode as an explicit user choice — never reads or
// follows the OS/browser's prefers-color-scheme. Starts in light mode
// on a first-ever visit, then remembers whatever the user last chose
// (via localStorage) on later visits.
@Service()
export class Theme {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly darkMode = signal(this.readStoredPreference());
  readonly isDark = this.darkMode.asReadonly();

  constructor() {
    effect(() => {
      const dark = this.darkMode();
      // Only touch the DOM/localStorage in the browser — neither exists
      // during server-side rendering.
      if (!this.isBrowser) {
        return;
      }
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, String(dark));
    });
  }

  toggle(): void {
    this.darkMode.update((dark) => !dark);
  }

  private readStoredPreference(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }
}
