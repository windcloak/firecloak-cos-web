import { Component, ElementRef, afterRenderEffect, input, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

export interface GalleryPhoto {
  thumbSrc: string;
  thumbWidth: number;
  thumbHeight: number;
  fullSrc: string;
  fullWidth: number;
  fullHeight: number;
  // Standard responsive-image srcset (e.g. "cosplay/id/m/1.jpg 534w,
  // cosplay/id/1.jpg 667w") — lets PhotoSwipe serve a smaller file on
  // phones and the full-res one only when actually needed. Optional
  // since not every photo has more than one size (e.g. WIP shots).
  fullSrcset?: string;
  alt: string;
  caption?: string;
}

// Shared by every photo grid + lightbox on the site (cosplay gallery,
// WIP gallery, future tutorial galleries, etc.) so the PhotoSwipe wiring
// only lives in one place.
@Component({
  selector: 'app-photo-gallery',
  imports: [NgOptimizedImage],
  templateUrl: './photo-gallery.html',
  styleUrl: './photo-gallery.scss',
})
export class PhotoGallery {
  photos = input.required<GalleryPhoto[]>();

  private readonly galleryEl = viewChild<ElementRef<HTMLElement>>('galleryEl');

  constructor() {
    // afterRenderEffect (unlike a plain effect()) only ever runs in the
    // browser, never during SSR — PhotoSwipe reaches for `document`
    // directly, which doesn't exist on the server and would otherwise
    // crash the SSR render. It re-runs whenever the gallery's DOM
    // container becomes available or the photo list changes (e.g. this
    // same component instance gets reused navigating between two
    // cosplays' detail pages), and onCleanup tears down the previous
    // lightbox instance both on re-run and on component destroy.
    afterRenderEffect((onCleanup) => {
      const el = this.galleryEl()?.nativeElement;
      const photos = this.photos();

      if (!el || photos.length === 0) {
        return;
      }

      const lightbox = new PhotoSwipeLightbox({
        gallery: el,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();

      onCleanup(() => lightbox.destroy());
    });
  }
}
