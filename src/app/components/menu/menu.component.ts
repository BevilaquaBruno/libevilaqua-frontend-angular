import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent {

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
  }

  isSelected(path: string){
    let className: string = "";
    if(window.location.pathname.indexOf(path) != -1)
      className += 'pure-menu-selected';
    if((localStorage.getItem('token') !== null && localStorage.getItem('token')?.trim() !== '')){
      if(path ==='login')
        className += ' hidden';
    }else{
      if(path !== 'login')
        className += ' hidden';
    }

    return className;
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }
}
