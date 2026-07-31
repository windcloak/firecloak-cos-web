import { Component, computed, inject, resource, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TutorialsService } from '../tutorials';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

@Component({
  selector: 'app-tutorials',
  imports: [
    RouterLink,
    NgOptimizedImage,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    LoadingSpinner,
  ],
  templateUrl: './tutorials.html',
  styleUrl: './tutorials.scss',
})
export class Tutorials {
  private readonly tutorialsService = inject(TutorialsService);

  protected readonly tutorialsResource = resource({
    loader: () => this.tutorialsService.list(),
    defaultValue: [],
  });

  // Two-way bound to the search box via [(ngModel)] — same pattern as
  // the cosplay list page's live filter.
  protected readonly term = signal('');

  // Recomputes automatically whenever either the search term or the
  // underlying tutorial list changes.
  protected readonly filteredTutorials = computed(() => {
    const term = this.term().trim().toLowerCase();
    const tutorials = this.tutorialsResource.value();
    if (!term) {
      return tutorials;
    }
    return tutorials.filter(
      (tutorial) =>
        tutorial.name.toLowerCase().includes(term) ||
        tutorial.description.toLowerCase().includes(term),
    );
  });
}
