import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../author.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-author',
  templateUrl: './form-author.component.html'
})
export class FormAuthorComponent {
  new: boolean = true;
  id: number = 0;

  formAuthor!: FormGroup;
  authorError = {
    error: false,
    message: ''
  };

  constructor(
    private AuthorService: AuthorService,
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
      this.AuthorService.get(this.id).subscribe((author) => {
        this.formAuthor.setValue({ name: author.name, birth_date: author.birth_date, death_date: author.death_date, bio: author.bio  });
      })

    }
  }

  ngOnInit(): void {
    let formGroupData = {
      name: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
      birth_date: [null],
      death_date: [null],
      bio: [null, Validators.compose([Validators.maxLength(500)])]
    };
    this.formAuthor = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formAuthor.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    if (this.new) {
      this.AuthorService.create(this.formAuthor.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/autores']);
        }
      }, (response) => {
        this.authorError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.AuthorService.update(this.id, this.formAuthor.value).subscribe((response) => {
        if(response.affected != undefined && response.affected > 0){
          this.router.navigate(['/autores']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/autores']); }

}
