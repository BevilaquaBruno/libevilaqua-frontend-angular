import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { UsuarioInterface } from '../usuario.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css'],
})
export class ListUsuariosComponent implements OnInit {
  listUsers: UsuarioInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;

  constructor(
    private service: UsuarioService,
    private appService: AppService,
    private router: Router
  ) {
    this.appService.isValid().subscribe(
      () => {},
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
      const storageItensPerPage = localStorage.getItem('itensPerPage');
    if(storageItensPerPage != null){
      this.itensPerPage = parseInt(storageItensPerPage);
    }
  }

  deleteUser(id: number){
    console.log('Delete user ' + id);
  }

  updateUserList() {
    this.service
      .list(this.currentPage, this.itensPerPage)
      .subscribe((users) => {
        this.maxRegisters = users.count;
        this.listUsers = users.data;
        let calcMaxPage = parseInt((this.maxRegisters / this.itensPerPage).toFixed(0));
        if((this.maxRegisters % this.itensPerPage) != 0) calcMaxPage++;
        this.maxPages = calcMaxPage;
      });
  }

  ngOnInit(): void {
    this.updateUserList();
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updateUserList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updateUserList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updateUserList();
  }
}
