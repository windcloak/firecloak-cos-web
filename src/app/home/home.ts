import { Component, inject, resource, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cosplays } from '../cosplays';
import { TutorialsService } from '../tutorials';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { PreviewCard } from '../preview-card/preview-card';

interface HeroSlide {
  id: string;
  character: string;
  series: string;
}

const HERO_SLIDES: HeroSlide[] = [
  { id: 'princess-peach-smash-bros-ultimate', character: 'Princess Peach', series: 'Super Mario Bros' },
  { id: 'holo-merchants-spice-and-wolf', character: 'Holo', series: 'Spice & Wolf' },
  { id: 'aqua-konosuba', character: 'Aqua', series: 'Konosuba!' },
  { id: 'tohru-swimsuit-dragon-maid', character: 'Tohru', series: "Ms. Kobayashi's Dragon Maid" },
  { id: 'louise-familiar-of-zero', character: 'Louise', series: 'Familiar of Zero' },
  { id: 'violet-evergarden', character: 'Violet', series: 'Violet Evergarden' },
  { id: 'nami-gangsta-onepiece', character: 'Nami', series: 'One Piece' },
];

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgOptimizedImage, MatIconModule, MatButtonModule, LoadingSpinner, PreviewCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly cosplaysService = inject(Cosplays);
  private readonly tutorialsService = inject(TutorialsService);

  protected readonly slides = HERO_SLIDES;

  // Manual-only navigation — no autoplay timer.
  protected readonly currentSlide = signal(0);

  // Swipe support for touch devices.
  private touchStartX = 0;
  private touchCurrentX = 0;
  private readonly swipeThreshold = 40;
  private suppressNextClick = false;

  protected readonly cosplaysResource = resource({
    loader: () => this.cosplaysService.preview(),
    defaultValue: [],
  });

  protected readonly tutorialsResource = resource({
    loader: () => this.tutorialsService.preview(),
    defaultValue: [],
  });

  protected previousSlide(): void {
    this.currentSlide.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }

  protected nextSlide(): void {
    this.currentSlide.update((i) => (i + 1) % this.slides.length);
  }

  protected goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
  }

  protected onTouchMove(event: TouchEvent): void {
    this.touchCurrentX = event.touches[0].clientX;
  }

  protected onTouchEnd(): void {
    const delta = this.touchCurrentX - this.touchStartX;
    if (Math.abs(delta) > this.swipeThreshold) {
      if (delta > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
      // A swipe just changed the slide — don't let the browser's
      // synthetic click (fired right after touchend) also navigate
      // to the cosplay page underneath the finger.
      this.suppressNextClick = true;
    }
  }

  protected onSlideClick(event: MouseEvent): void {
    if (this.suppressNextClick) {
      event.preventDefault();
      this.suppressNextClick = false;
    }
  }
}
