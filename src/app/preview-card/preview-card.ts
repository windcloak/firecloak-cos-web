import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

// Shared by every "grid of cards linking to a detail page" spot on the
// site (cosplay list, tutorials list, and the Home page's preview
// sections) so the mat-card markup only lives in one place. The image
// aspect ratio is derived from imageWidth/imageHeight rather than
// hardcoded, since cosplay icons (portrait) and tutorial icons
// (square) aren't the same shape.
@Component({
  selector: 'app-preview-card',
  imports: [RouterLink, NgOptimizedImage, MatCardModule],
  templateUrl: './preview-card.html',
  styleUrl: './preview-card.scss',
})
export class PreviewCard {
  routerLink = input.required<string[]>();
  imageSrc = input.required<string>();
  imageWidth = input.required<number>();
  imageHeight = input.required<number>();
  title = input.required<string>();
  subtitle = input.required<string>();
}
