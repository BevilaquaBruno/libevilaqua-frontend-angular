import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Libevilaqua';
  theme = localStorage.getItem('theme');

  constructor() {
    this.title = environment.title;
  }

  setTheme() {
    return this.theme;
  }
}
