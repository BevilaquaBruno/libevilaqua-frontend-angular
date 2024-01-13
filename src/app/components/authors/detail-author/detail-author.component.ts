import { AuthorService } from './../author.service';
import { Component } from '@angular/core';
import { AuthorInterface } from '../author.interface';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getFormattedDate } from 'src/assets/helpers';

@Component({
  selector: 'app-detail-author',
  templateUrl: './detail-author.component.html'
})
export class DetailAuthorComponent {
  author: AuthorInterface = {
    id: 0,
    name: '',
    birth_date: '',
    death_date: '',
    bio: '',
  };

  publisherFound: boolean = true;
  getFormattedDate = getFormattedDate;

  constructor(
    private AuthorService: AuthorService,
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
      this.AuthorService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.publisherFound = false;
          else
            this.author = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToAuthorEdit(){
    this.router.navigate([`/autores/${this.author.id}/editar`]);
  }
}
