import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Home} from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  template: `<router-outlet>

     <main>
      <header class="brand-name">
        <img class="brand-logo" src="/public/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-home />
      </section>
    </main>

  </router-outlet>`,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('firecloak-cos-web');
}
