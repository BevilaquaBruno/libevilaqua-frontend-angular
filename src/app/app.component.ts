import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Libevilaqua';
  theme = localStorage.getItem('theme');

  constructor() {
    this.title = environment.title
  }

  setTheme(){
    if (this.theme === 'dark'){
      localStorage.setItem('theme', 'dark');
      return 'dark';
    }else if(this.theme === 'light'){
      localStorage.setItem('theme', 'light');
      return 'light';
    }
    localStorage.setItem('theme', 'dark');
    return 'dark';
  }
}
