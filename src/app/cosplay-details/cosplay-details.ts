import { Component, inject, input, resource } from '@angular/core';
import { Cosplays } from '../cosplays';

@Component({
  selector: 'app-cosplay-details',
  imports: [],
  templateUrl: './cosplay-details.html',
  styleUrl: './cosplay-details.scss',
})
export class CosplayDetails {
  private readonly cosplaysService = inject(Cosplays);

  id = input<string>();

  // params() returning undefined (before the route has an id bound
  // yet) means the loader is skipped entirely rather than called with
  // an invalid id — Angular re-runs the loader whenever id() changes,
  // e.g. navigating from one cosplay's detail page to another's.
  protected readonly cosplayResource = resource({
    params: () => this.id(),
    loader: ({ params }) => this.cosplaysService.byId(params),
  });
}
