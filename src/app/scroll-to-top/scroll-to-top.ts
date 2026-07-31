import { Component, afterRenderEffect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';

// How far down the page you need to scroll before the button appears.
const SHOW_AFTER_PX = 300;

@Component({
  selector: 'app-scroll-to-top',
  imports: [MatButtonModule, FontAwesomeModule],
  templateUrl: './scroll-to-top.html',
  styleUrl: './scroll-to-top.scss',
})
export class ScrollToTop {
  protected readonly faCircleChevronUp = faCircleChevronUp;
  protected readonly visible = signal(false);

  constructor() {
    // afterRenderEffect (rather than a plain effect()) since this
    // touches document/window, which don't exist during SSR — see
    // photo-gallery.ts for the same pattern.
    //
    // The actual page scrolling happens on <mat-sidenav-content>, not
    // the window. Scroll events don't bubble, but a capture-phase
    // listener registered on `window` still sees every scroll in the
    // document (capture always runs top-down from window regardless
    // of the bubbles flag) — this is the standard "detect scroll
    // anywhere" idiom.
    afterRenderEffect((onCleanup) => {
      const onScroll = (event: Event) => {
        const target = event.target;
        const scrollTop =
          target instanceof Document
            ? (target.scrollingElement?.scrollTop ?? 0)
            : (target as HTMLElement).scrollTop;
        this.visible.set(scrollTop > SHOW_AFTER_PX);
      };

      window.addEventListener('scroll', onScroll, { capture: true, passive: true });
      onCleanup(() => window.removeEventListener('scroll', onScroll, true));
    });
  }

  protected scrollToTop(): void {
    // Cover both possible scrolling elements — whichever one isn't
    // actually scrolled is simply a no-op.
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('mat-sidenav-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
