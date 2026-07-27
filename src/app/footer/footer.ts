import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  // Computed once when the component is created, not read from the
  // template, so it doesn't run into the "don't assume globals like
  // new Date() are available" template rule.
  protected readonly year = new Date().getFullYear();
}
