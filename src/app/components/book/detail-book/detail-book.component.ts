import { Component } from '@angular/core';
import { BookInterface } from '../book.interface';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { getFormattedDate } from 'src/assets/helpers';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
})
export class DetailBookComponent {

  getFormattedDate = getFormattedDate;

  book: BookInterface = {
    id: 0,
    title: '',
    isbn: '',
    edition: 0,
    number_pages: 0,
    obs: '',
    release_year: 0,
    authors: [],
    type: null,
    genre: null,
    publisher: null,
    tags: []
  };

  bookFound: boolean = true;

  constructor(
    private bookService: BookService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appService.isValid().subscribe(
      () => {},
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
    let tempId = this.route.snapshot.paramMap.get('id');
    if (tempId != null)
      this.bookService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.bookFound = false;
          else
            this.book = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToBookEdit(){
    this.router.navigate([`/livros/${this.book.id}/editar`]);
  }
}
