import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tutorial-details',
  imports: [],
  templateUrl: './tutorial-details.html',
  styleUrl: './tutorial-details.scss',
})
export class TutorialDetails {
  id = input<string>();
}
