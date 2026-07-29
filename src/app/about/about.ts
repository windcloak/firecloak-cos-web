import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, MatListModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly cosplayingSince = 2010;
  protected readonly yearsCosplaying = new Date().getFullYear() - this.cosplayingSince;

  profiles = [
    {
      title: 'Name',
      description: 'May',
    },
    {
      title: 'Birthday',
      description: 'Jan 14',
    },
    {
      title: 'Height',
      description: '164 cm (5 ft 4 in)',
    },
    {
      title: 'Ethnicity',
      description: 'Chinese-American',
    },
    {
      title: 'Cosplaying Since',
      description: `2010 (${this.yearsCosplaying} years)`,
    },
    {
      title: 'Hobbies',
      description: 'Cosplay, gardening, sewing, cooking',
    },
    {
      title: 'Occupation',
      description: 'Software Engineer',
    },
  ];
}
