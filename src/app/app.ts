import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Cosplay } from './cosplay/cosplay';
import { CosplayDetails } from './cosplay-details/cosplay-details';
import { Tutorials } from './tutorials/tutorials';
import { TutorialDetails } from './tutorial-details/tutorial-details';
import { Contact } from './contact/contact';
import { Reviews } from './reviews/reviews';
import { Links } from './links/links';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    Home,
    About,
    Cosplay,
    CosplayDetails,
    Tutorials,
    TutorialDetails,
    Contact,
    Reviews,
    Links,
  ],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      |
      <a routerLink="/about">About</a> |
      <a routerLink="/cosplay">Cosplay</a>
      |
      <a routerLink="/tutorials">Tutorials</a> | <a routerLink="/contact">Contact</a> |
      <a routerLink="/links">Links</a>|
      <a routerLink="/reviews">Reviews</a>
    </nav>
    <router-outlet />
  `,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('firecloak-cos-web');
}
