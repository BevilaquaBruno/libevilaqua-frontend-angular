import { Component, ViewChild } from '@angular/core';
import { BookFiltersRaw, BookFiltersToString, BookInterface } from '../book.interface';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { BookService } from '../book.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { TagInterface, TagListInterface } from '../../tags/tag.interface';
import { AuthorInterface, AuthorListInterface } from '../../authors/author.interface';
import { TypeInterface, TypeListInterface } from '../../types/type.interface';
import { PublisherInterface, PublisherListInterface } from '../../publishers/publisher.interface';
import { GenreInterface, GenreListInterface } from '../../genre/genre.interface';
import { TagsService } from '../../tags/tags.service';
import { AuthorService } from '../../authors/author.service';
import { TypeService } from '../../types/type.service';
import { PublisherService } from '../../publishers/publisher.service';
import { GenreService } from '../../genre/genre.service';
import { PopupComponent } from '../../general/popup/popup.component';
import { getAuthorListJoined } from 'src/assets/helpers';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html'
})
export class ListBooksComponent {
  listBooks: BookInterface[] = [];
  listTags: TagInterface[] = [];
  listAuthors: AuthorInterface[] = [];
  listTypes: TypeInterface[] = [];
  listPublishers: PublisherInterface[] = [];
  listGenres: GenreInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0, message: '' };
  selectedFilters: BookFiltersRaw = {
    tags: [],
    authors: [],
    types: [],
    publishers: [],
    genres: [],
    number_pages: [],
    release_year: null,
    isbn: null,
    edition: null,
    title: null
  };

  @ViewChild(ConfirmDialogComponent) confirmationDialog!: ConfirmDialogComponent;
  @ViewChild(PopupComponent) popup!: PopupComponent;
  
  getAuthorListJoined = getAuthorListJoined;

  constructor(
    private bookService: BookService,
    private tagService: TagsService,
    private authorService: AuthorService,
    private typeService: TypeService,
    private publisherService: PublisherService,
    private genreService: GenreService,
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
    this.updateBookList();
    this.tagService.list(1, 1000).subscribe((tags) => this.listTags = tags.data);
    this.authorService.list(1, 1000).subscribe((authors) => this.listAuthors = authors.data);
    this.typeService.list(1, 1000).subscribe((types) => this.listTypes = types.data);
    this.publisherService.list(1, 1000).subscribe((publishers) => this.listPublishers = publishers.data);
    this.genreService.list(1, 1000).subscribe((genres) => this.listGenres = genres.data);
  }

  openNewBook() {
    this.router.navigate(['/livros/cadastrar']);
  }

  openConfirmDeleteBook(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.openModal();
  }

  finishDeleteBook() {
    this.deleteData.id = 0;
    this.confirmationDialog.closeModal();
    this.updateBookList();
  }

  confirmDeleteBook() {
    if (this.deleteData.id != 0) {
      this.bookService.delete(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeleteBook();
          }
        }, (e) => {
          this.deleteData.message = e.error.message;
          this.popup.initPopup();
          this.popup.showPopup();
        });
    }
  }

  updateBookList() {
    this.bookService
      .list(this.currentPage, this.itensPerPage, this.convertSelectedFilters(this.selectedFilters))
      .subscribe((types) => {
        this.maxRegisters = types.count;
        this.listBooks = types.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
        this.maxPages = calcMaxPage;
      });
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updateBookList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updateBookList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updateBookList();
  }

  private convertSelectedFilters(data: BookFiltersRaw): BookFiltersToString {
    let stringFilters: BookFiltersToString = { data: {} };

    if (data.tags != undefined && data.tags?.length > 0)
      stringFilters.data.tags = data.tags.join(',');

    if (data.authors != undefined && data.authors?.length > 0)
      stringFilters.data.authors = data.authors.join(',');

    if (data.tags != undefined && data.tags?.length > 0)
      stringFilters.data.tags = data.tags.join(',');

    if (data.types != undefined && data.types?.length > 0)
      stringFilters.data.types = data.types.join(',');

    if (data.publishers != undefined && data.publishers?.length > 0)
      stringFilters.data.publishers = data.publishers.join(',');

    if (data.genres != undefined && data.genres?.length > 0)
      stringFilters.data.genres = data.genres.join(',');

    if (data.types != undefined && data.types?.length > 0)
      stringFilters.data.types = data.types.join(',');

    if (data.number_pages != undefined && data.number_pages?.length > 0)
      stringFilters.data.number_pages = data.number_pages.join(',');

    if (data.release_year != undefined)
      stringFilters.data.release_year = data.release_year.toString();

    if (data.isbn != undefined)
      stringFilters.data.isbn = data.isbn;

    if (data.edition != undefined)
      stringFilters.data.edition = data.edition.toString();

    if (data.title != undefined)
      stringFilters.data.title = data.title;

    return stringFilters;
  }
}
