import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
  ]
})
export class LoadingComponent {
  @Input({ required: true }) loading!: () => boolean;
}
