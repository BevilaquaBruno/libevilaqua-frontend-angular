import { Component, ViewChild } from '@angular/core';
import { AuthorInterface } from '../author.interface';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { AuthorService } from '../author.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { getFormattedDate } from 'src/assets/helpers';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html'
})
export class ListAuthorsComponent {
  listAuthors: AuthorInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0 };

  @ViewChild(ConfirmDialogComponent) confirmationDialog!: ConfirmDialogComponent;

  getFormattedDate = getFormattedDate;

  constructor(
    private service: AuthorService,
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
    this.updateAuthorList();
  }

  openNewAuthor() {
    this.router.navigate(['/autores/cadastrar']);
  }

  openConfirmDeleteAuthor(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.openModal();
  }

  finishDeleteAuthor() {
    this.deleteData.id = 0;
    this.confirmationDialog.closeModal();
    this.updateAuthorList();
  }

  confirmDeleteAuthor() {
    if (this.deleteData.id != 0) {
      this.service.delete(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeleteAuthor();
          }
        }, (error) => {
          console.log('Erro ao deletar autor');
        });
    }
  }

  updateAuthorList() {
    this.service
      .list(this.currentPage, this.itensPerPage)
      .subscribe((types) => {
        this.maxRegisters = types.count;
        this.listAuthors = types.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
        this.maxPages = calcMaxPage;
      });
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updateAuthorList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updateAuthorList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updateAuthorList();
  }

}
