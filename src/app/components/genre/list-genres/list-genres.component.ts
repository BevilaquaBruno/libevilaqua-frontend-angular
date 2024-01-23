import { Component, ViewChild } from '@angular/core';
import { GenreInterface } from '../genre.interface';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { GenreService } from '../genre.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../../general/popup/popup.component';

@Component({
  selector: 'app-list-genres',
  templateUrl: './list-genres.component.html'
})
export class ListGenresComponent {
  listGenres: GenreInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0, message: '' };

  @ViewChild(ConfirmDialogComponent) confirmationDialog!: ConfirmDialogComponent;
  @ViewChild(PopupComponent) popup!: PopupComponent;

  constructor(
    private service: GenreService,
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
    this.updateGenreList();
  }

  openNewGenre() {
    this.router.navigate(['/generos/cadastrar']);
  }

  openConfirmDeleteGenre(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.openModal();
  }

  finishDeleteGenre() {
    this.deleteData.id = 0;
    this.confirmationDialog.closeModal();
    this.updateGenreList();
  }

  confirmDeleteGenre() {
    if (this.deleteData.id != 0) {
      this.service.delete(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeleteGenre();
          }
        }, (e) => {
          this.deleteData.message = e.error.message;
          this.popup.initPopup();
          this.popup.showPopup();
        });
    }
  }

  updateGenreList() {
    this.service
      .list(this.currentPage, this.itensPerPage)
      .subscribe((types) => {
        this.maxRegisters = types.count;
        this.listGenres = types.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
        this.maxPages = calcMaxPage;
      });
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updateGenreList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updateGenreList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updateGenreList();
  }
}
