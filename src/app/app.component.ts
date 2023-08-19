import { Component } from '@angular/core';
import { environment, constants } from 'src/environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Libevilaqua';

  constructor() {
    this.title = environment.title
  }
}
