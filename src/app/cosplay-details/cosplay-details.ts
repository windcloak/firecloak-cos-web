import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cosplay-details',
  imports: [],
  templateUrl: './cosplay-details.html',
  styleUrl: './cosplay-details.scss',
})
export class CosplayDetails {
  id = input<string>();
}
