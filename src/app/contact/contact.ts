import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgqvppv';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  protected readonly submitting = signal(false);
  protected readonly succeeded = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
    // Honeypot: real users never see this field (hidden off-screen,
    // see contact.scss). Bots that blindly fill every input they find
    // will fill it in; Formspree silently discards any submission
    // where it's non-empty. The field must be named _gotcha for
    // Formspree's own honeypot handling to recognize it.
    _gotcha: [''],
  });

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.http
      .post(FORMSPREE_ENDPOINT, this.form.getRawValue(), {
        headers: { Accept: 'application/json' },
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.succeeded.set(true);
          this.form.reset();
        },
        error: () => {
          this.submitting.set(false);
          this.error.set(
            "Something went wrong sending your message — please try again, or email me directly.",
          );
        },
      });
  }

  // Clicking a nav link back to the same route doesn't destroy/recreate
  // this component (Angular's Router treats same-URL navigation as a
  // no-op by default), so the success message would otherwise stick
  // around forever. This gives an explicit way back to a blank form.
  protected sendAnother(): void {
    this.succeeded.set(false);
  }
}
