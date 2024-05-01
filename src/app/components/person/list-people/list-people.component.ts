import { Component, ViewChild } from '@angular/core';
import { PersonInterface } from '../person.interface';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { PopupComponent } from '../../general/popup/popup.component';
import { PersonService } from '../person.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
})
export class ListPeopleComponent {
  listPeople: PersonInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0, message: '' };

  @ViewChild(ConfirmDialogComponent) confirmationDialog!: ConfirmDialogComponent;
  @ViewChild(PopupComponent) popup!: PopupComponent;

  constructor(
    private service: PersonService,
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

  ngOnInit(): void {
    this.updatePeopleList();
  }

  openNewPerson() {
    this.router.navigate(['/pessoas/cadastrar']);
  }

  openConfirmDeletePerson(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.openModal();
  }

  finishDeletePerson() {
    this.deleteData.id = 0;
    this.confirmationDialog.closeModal();
    this.updatePeopleList();
  }

  confirmDeletePerson() {
    if (this.deleteData.id != 0) {
      this.service.delete(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeletePerson();
          }
        }, (e) => {
          this.deleteData.message = e.error.message;
          this.popup.initPopup();
          this.popup.showPopup();
        });
    }
  }

  updatePeopleList() {
    this.service
      .list(this.currentPage, this.itensPerPage)
      .subscribe((response) => {
        console.log(response);

        this.maxRegisters = response.count;
        this.listPeople = response.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
        this.maxPages = calcMaxPage;
      });
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updatePeopleList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updatePeopleList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updatePeopleList();
  }
}
