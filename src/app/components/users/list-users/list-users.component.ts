import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserInterface } from '../user.interface';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { PopupComponent } from '../../general/popup/popup.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: [],
})
export class ListUsersComponent implements OnInit {
  listUsers: UserInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0, message: '' };

  @ViewChild(ConfirmDialogComponent) confirmationDialog!: ConfirmDialogComponent;
  @ViewChild(PopupComponent) popup!: PopupComponent;

  constructor(
    private service: UserService,
    private appService: AppService,
    private router: Router
  ) {
    this.appService.isValid().subscribe(
      () => { },
      (error) => {
        if (error.status === 401) this.router.navigate(['/login']);
      }
    );
    const storageItensPerPage = localStorage.getItem('itensPerPage');
    if (storageItensPerPage != null) {
      this.itensPerPage = parseInt(storageItensPerPage);
    }
  }

  openNewUser() {
    this.router.navigate(['/usuarios/cadastrar']);
  }

  openConfirmDeleteUser(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.openModal();
  }

  finishDeleteUser() {
    this.deleteData.id = 0;
    this.confirmationDialog.closeModal();
    this.updateUserList();
  }

  confirmDeleteUser() {
    if (this.deleteData.id != 0) {
      this.service.deleteUser(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeleteUser();
          }
        }, (e) => {
          this.deleteData.message = e.error.message;
          this.popup.initPopup();
          this.popup.showPopup()
        });
    }
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
