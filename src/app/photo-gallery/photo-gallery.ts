import { Component, DestroyRef, ElementRef, effect, inject, input, viewChild } from '@angular/core';
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
  private lightbox?: PhotoSwipeLightbox;

  constructor() {
    // Re-runs whenever the gallery's DOM container becomes available or
    // the photo list changes — e.g. this same component instance gets
    // reused when navigating from one cosplay's detail page to another's.
    effect(() => {
      const el = this.galleryEl()?.nativeElement;
      const photos = this.photos();

      this.lightbox?.destroy();
      this.lightbox = undefined;

      if (!el || photos.length === 0) {
        return;
      }

      this.lightbox = new PhotoSwipeLightbox({
        gallery: el,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      this.lightbox.init();
    });

    inject(DestroyRef).onDestroy(() => this.lightbox?.destroy());
  }
}
