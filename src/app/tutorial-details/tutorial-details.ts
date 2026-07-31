import { Component, computed, inject, input, resource } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, of } from 'rxjs';
import { TutorialsService } from '../tutorials';
import { stripAssetsPrefix } from '../legacy-image-path';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import {MatListModule} from '@angular/material/list';


type DimensionsManifest = Record<string, { width: number; height: number }>;

interface StepImage {
  src: string;
  width: number;
  height: number;
  caption: string;
  description: string;
  link?: string;
}


const PLACEHOLDER_SRC = 'placeholder.gif';

@Component({
  selector: 'app-tutorial-details',
  imports: [NgOptimizedImage, LoadingSpinner, MatListModule],
  templateUrl: './tutorial-details.html',
  styleUrl: './tutorial-details.scss',
})
export class TutorialDetails {
  private readonly tutorialsService = inject(TutorialsService);
  private readonly http = inject(HttpClient);

  protected readonly placeholderSrc = PLACEHOLDER_SRC;

  id = input<string>();

  // params() returning undefined (before the route has an id bound
  // yet) means the loader is skipped entirely rather than called with
  // an invalid id — Angular re-runs the loader whenever id() changes.
  protected readonly tutorialResource = resource({
    params: () => this.id(),
    loader: ({ params }) => this.tutorialsService.byId(params),
  });

  protected readonly dimensionsResource = resource({
    params: () => this.id(),
    loader: ({ params }) =>
      firstValueFrom(
        this.http
          .get<DimensionsManifest>(`tutorials/${params}/dimensions.json`)
          .pipe(catchError(() => of<DimensionsManifest>({}))),
      ),
  });


  protected readonly mainImgSrc = computed(() =>
    stripAssetsPrefix(this.tutorialResource.value()?.mainImgUrl),
  );

  protected readonly mainImgDims = computed(() => {
    const id = this.id();
    const src = this.mainImgSrc();
    if (!id || !src) {
      return undefined;
    }
    const dims = this.dimensionsResource.value() ?? {};
    return dims[src.replace(`tutorials/${id}/`, '')];
  });

  protected readonly stepImages = computed<StepImage[]>(() => {
    const tutorial = this.tutorialResource.value();
    const id = this.id();
    if (!tutorial || !id) {
      return [];
    }

    const dims = this.dimensionsResource.value() ?? {};
    const prefix = `tutorials/${id}/`;

    return (tutorial.steps ?? []).map((step) => {
      const src = stripAssetsPrefix(step.image) ?? '';
      const size = dims[src.replace(prefix, '')];
      return {
        src,
        width: size?.width ?? 800,
        height: size?.height ?? 600,
        caption: step.caption,
        description: step.description,
        link: step.link,
      };
    });
  });
}
