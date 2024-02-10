import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsService } from '../../tags/tags.service';
import { AuthorService } from '../../authors/author.service';
import { TypeService } from '../../types/type.service';
import { PublisherService } from '../../publishers/publisher.service';
import { GenreService } from '../../genre/genre.service';
import { TagInterface } from '../../tags/tag.interface';
import { AuthorInterface } from '../../authors/author.interface';
import { TypeInterface } from '../../types/type.interface';
import { PublisherInterface } from '../../publishers/publisher.interface';
import { GenreInterface } from '../../genre/genre.interface';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html'
})
export class FormBookComponent {
  new: boolean = true;
  id: number = 0;

  formBook!: FormGroup;

  listTags: TagInterface[] = [];
  listAuthors: AuthorInterface[] = [];
  listTypes: TypeInterface[] = [];
  listPublishers: PublisherInterface[] = [];
  listGenres: GenreInterface[] = [];

  bookError = {
    error: false,
    message: ''
  };

  constructor(
    private bookService: BookService,
    private tagService: TagsService,
    private authorService: AuthorService,
    private typeService: TypeService,
    private publisherService: PublisherService,
    private genreService: GenreService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.appService.isValid().subscribe(
      () => { },
      (error) => {
        if (error.status === 401) this.router.navigate(['/login']);
      }
    );

    if ('cadastrar' == this.route.snapshot.routeConfig?.path) {
      this.new = true;
      this.id = 0;
    } else if (':id/editar') {
      this.new = false;
      this.id = this.route.snapshot.params['id'];
      this.bookService.get(this.id).subscribe((book) => {

        let authors: { id: number; }[] = [];
        book.authors.forEach(author => {
          authors.push({ id: author.id });
        });

        let tags: { id: number; }[] = [];
        book.tags.forEach(tag => {
          tags.push({ id: tag.id });
        });

        this.formBook.setValue({
          title: book.title,
          edition: book.edition,
          isbn: book.isbn,
          number_pages: book.number_pages,
          release_year: book.release_year,
          obs: book.obs,
          genreId: book.genre?.id,
          publisherId: book.publisher?.id,
          typeId: book.type?.id,
          authors: authors,
          tags: tags
        });
      })
    }
  }

  ngOnInit(): void {
    this.tagService.list(1, 1000).subscribe((tags) => this.listTags = tags.data);
    this.authorService.list(1, 1000).subscribe((authors) => this.listAuthors = authors.data);
    this.typeService.list(1, 1000).subscribe((types) => this.listTypes = types.data);
    this.publisherService.list(1, 1000).subscribe((publishers) => this.listPublishers = publishers.data);
    this.genreService.list(1, 1000).subscribe((genres) => this.listGenres = genres.data);

    let formGroupData = {
      title: ['', Validators.compose([Validators.required])],
      edition: [null, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.maxLength(10)])],
      isbn: ['', Validators.compose([Validators.maxLength(13)])],
      number_pages: [null, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.maxLength(10)])],
      release_year: [null, Validators.compose([Validators.maxLength(4)])],
      obs: ['', Validators.compose([])],
      genreId: [null],
      publisherId: [null],
      typeId: [null],
      authors: [[]],
      tags: [[]],

    };
    this.formBook = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formBook.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    if (this.new) {
      this.bookService.create(this.formBook.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/livros']);
        }
      }, (response) => {
        this.bookError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.bookService.update(this.id, this.formBook.value).subscribe((response) => {
        console.log(response);

        if (response.affected != undefined && response.affected > 0) {
          this.router.navigate(['/livros']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/livros']); }

}
