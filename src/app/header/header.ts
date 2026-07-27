import { Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NAV_LINKS } from '../nav-links';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly breakpointObserver = inject(BreakpointObserver);

  // True on phone-sized viewports; drives whether we show the hamburger
  // trigger button or the horizontal nav row.
  protected readonly isHandset = toSignal(
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  protected readonly menuLinks = NAV_LINKS;

  // The header no longer owns the mobile menu's contents/overlay — it
  // just reports "the hamburger was tapped" and lets the app shell
  // (which owns the mat-sidenav) decide what happens.
  readonly menuToggle = output<void>();
}
