import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { UsuarioInterface } from '../usuario.interface';
import { AppService } from 'src/app/app.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: [],
})
export class ListUsuariosComponent implements OnInit {
  listUsers: UsuarioInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = {id: 0, index: -1};
  modalDelete!: Modal;

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
    if (storageItensPerPage != null) {
      this.itensPerPage = parseInt(storageItensPerPage);
    }
  }

  openConfirmDeleteUser(id: number, index: number){
    this.deleteData.id = id;
    this.deleteData.index = index;
    this.modalDelete = new Modal(document.getElementById('popup-modal-delete-user'));
    this.modalDelete.show();
  }

  undoDeleteUser(){
    this.deleteData.id = 0;
    this.deleteData.index = -1;
    this.modalDelete.hide();
  }

  confirmDeleteUser() {
    if(this.deleteData.id != 0 && this.deleteData.index != -1){
      this.service.deleteUser(this.deleteData.id).subscribe((data) => {
        if(data.affected != 0){
          this.listUsers.splice(this.deleteData.index, 1);
          this.maxRegisters--;
        }
      });
    }
    this.modalDelete.hide();
  }

  updateUserList() {
    this.service
      .list(this.currentPage, this.itensPerPage)
      .subscribe((users) => {
        this.maxRegisters = users.count;
        this.listUsers = users.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
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
