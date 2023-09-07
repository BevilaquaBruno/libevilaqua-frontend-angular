import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent {

  currentTheme: string = '';

  constructor(private router: Router, private loginService: LoginService) {
    let token = localStorage.getItem('token');
    if(token != null && token != ''){
      loginService.validate(token).subscribe((response) => {}, (error) => {
        if(error.status === 401){
          localStorage.removeItem('token');
         router.navigate(['/login']);
         // i need to test this
        }
      });
    }
    const tempCurrentTheme = localStorage.getItem('theme');
    this.currentTheme = (tempCurrentTheme == null)? 'light' : tempCurrentTheme;
  }

  isSelected(path: string){
    let className: string = "";
    if(window.location.pathname.indexOf(path) != -1)
      className += 'bg-gray-100 dark:bg-slate-700';
    if((localStorage.getItem('token') !== null && localStorage.getItem('token')?.trim() !== '')){
      if(path ==='login')
        className += ' hidden ';
    }else{
      if(path !== 'login')
        className += ' hidden ';
    }

    return className;
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  swithTheme(){
    if (this.currentTheme == 'dark')
      localStorage.setItem('theme', 'light');
    else if (this.currentTheme == 'light')
      localStorage.setItem('theme', 'dark');

      window.location.reload();
  }
}
