import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

interface MenuLink {
  title: string;
  url: string;
}

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly breakpointObserver = inject(BreakpointObserver);

  // True on phone-sized viewports; drives whether we show the hamburger
  // menu or the horizontal nav row.
  protected readonly isHandset = toSignal(
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  protected readonly menuLinks: MenuLink[] = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Cosplay', url: '/cosplay' },
    { title: 'Tutorials', url: '/tutorials' },
    { title: 'Contact', url: '/contact' },
    { title: 'Reviews', url: '/reviews' },
    { title: 'Links', url: '/links' },
  ];
}
