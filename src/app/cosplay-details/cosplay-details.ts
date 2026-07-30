import { Component, computed, inject, input, resource } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Cosplays } from '../cosplays';

@Component({
  selector: 'app-cosplay-details',
  imports: [MatListModule, NgOptimizedImage],
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

  // mainImgUrl is a leftover from the old app's Firestore data, e.g.
  // "assets/cosplay/{id}/1.jpg" — the new app serves images straight
  // from the public root (no "assets/" folder), so we strip that prefix
  // rather than migrating every document in Firestore.
  protected readonly mainImgSrc = computed(() =>
    this.cosplayResource.value()?.mainImgUrl?.replace(/^assets\//, ''),
  );
}
