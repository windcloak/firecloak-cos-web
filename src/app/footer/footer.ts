import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SOCIAL_LINKS } from '../social-links';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  // Computed once when the component is created, not read from the
  // template, so it doesn't run into the "don't assume globals like
  // new Date() are available" template rule.
  protected readonly year = new Date().getFullYear();

  // Footer only shows a curated subset of the full list the Links
  // page shows, pulled from the shared SOCIAL_LINKS rather than
  // re-declaring its own copy of the same icons/URLs.
  private static readonly FOOTER_NAMES = ['TikTok', 'Instagram', 'Twitter'];
  protected readonly socialLinks = SOCIAL_LINKS.filter((link) =>
    Footer.FOOTER_NAMES.includes(link.name),
  );
}
