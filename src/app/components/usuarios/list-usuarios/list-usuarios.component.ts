import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { UsuarioInterface } from '../usuario.interface';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css'],
})
export class ListUsuariosComponent implements OnInit {
  listUsers: UsuarioInterface[] = [];
  currentPage :number = 1;
  itensPerPage :number = 10;
  maxPage :number = 0;

  constructor(private service: UsuarioService, private router: Router) {}

  updateUserList() {
    this.service.list(this.currentPage, this.itensPerPage).subscribe((users) => {
      if (users.length === 0) {
        this.maxPage = this.currentPage - 1;
        this.previousPage();
      } else this.listUsers = users;
    });
  }

  ngOnInit(): void {
    this.updateUserList();
  }

  nextPage() {
    if (this.maxPage !== this.currentPage) {
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

  itensPerPageChanged(){
    this.maxPage = 0;
    this.updateUserList();
  }
}
