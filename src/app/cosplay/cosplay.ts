import { Component, computed, inject, resource, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Cosplays } from '../cosplays';

@Component({
  selector: 'app-cosplay',
  imports: [
    RouterLink,
    NgOptimizedImage,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './cosplay.html',
  styleUrl: './cosplay.scss',
})
export class Cosplay {
  private readonly cosplaysService = inject(Cosplays);

  protected readonly cosplaysResource = resource({
    loader: () => this.cosplaysService.list(),
    defaultValue: [],
  });

  // Two-way bound to the search box via [(ngModel)] — Angular's
  // template compiler supports binding directly to a signal this way,
  // calling .set() on updates instead of needing a plain mutable field.
  protected readonly term = signal('');

  // Recomputes automatically whenever either the search term or the
  // underlying cosplay list changes — the signals-based replacement
  // for the old app's `| filter:term` pipe.
  protected readonly filteredCosplays = computed(() => {
    const term = this.term().trim().toLowerCase();
    const cosplays = this.cosplaysResource.value();
    if (!term) {
      return cosplays;
    }
    return cosplays.filter(
      (cosplay) =>
        cosplay.name.toLowerCase().includes(term) || cosplay.series.toLowerCase().includes(term),
    );
  });
}
