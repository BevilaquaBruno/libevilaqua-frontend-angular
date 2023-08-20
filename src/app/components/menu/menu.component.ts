import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent {

  constructor(private router: Router) {}

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
