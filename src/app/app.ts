import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Home} from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet, Home],
  template: `    
  <nav>
      <a routerLink="/">Home</a>
      |
      <a href="/about">About</a> | 
      <a href="/cosplay">Cosplay</a>
      |
      <a href="/tutorials">Tutorials</a>      |
      <a href="/contact">Contact</a> |
      <a href="/links">Links</a>|
      <a href="/reviews">Reviews</a>
    </nav>
    <router-outlet />
    `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('firecloak-cos-web');
}
