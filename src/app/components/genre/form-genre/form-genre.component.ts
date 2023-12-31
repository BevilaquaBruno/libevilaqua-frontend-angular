import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreService } from '../genre.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html'
})
export class FormGenreComponent {
  new: boolean = true;
  id: number = 0;

  formGenre!: FormGroup;
  genreError = {
    error: false,
    message: ''
  };

  constructor(
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
      this.genreService.get(this.id).subscribe((genre) => {
        this.formGenre.setValue({ description: genre.description });
      })
    }
  }

  ngOnInit(): void {
    let formGroupData = {
      description: ['', Validators.compose([Validators.required])],
    };
    this.formGenre = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formGenre.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    if (this.new) {
      this.genreService.create(this.formGenre.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/generos']);
        }
      }, (response) => {
        this.genreError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.genreService.update(this.id, this.formGenre.value).subscribe((response) => {
        console.log(response);

        if(response.affected != undefined && response.affected > 0){
          this.router.navigate(['/generos']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/generos']); }

}
