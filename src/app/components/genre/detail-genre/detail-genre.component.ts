import { GenreService } from './../genre.service';
import { Component } from '@angular/core';
import { TagInterface } from '../../tags/tag.interface';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreInterface } from '../genre.interface';

@Component({
  selector: 'app-detail-genre',
  templateUrl: './detail-genre.component.html'
})
export class DetailGenreComponent {
  genre: GenreInterface = {
    id: 0,
    description: ''
  };

  genreFound: boolean = true;

  constructor(
    private genreService: GenreService,
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
      this.genreService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.genreFound = false;
          else
            this.genre = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToGenreEdit(){
    this.router.navigate([`/generos/${this.genre.id}/editar`]);
  }

}
