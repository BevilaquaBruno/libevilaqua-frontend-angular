import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagsService } from '../tags.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-tag',
  templateUrl: './form-tag.component.html'
})
export class FormTagComponent {
  new: boolean = true;
  id: number = 0;

  formTag!: FormGroup;
  tagError = {
    error: false,
    message: ''
  };

  constructor(
    private tagService: TagsService,
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
      this.tagService.get(this.id).subscribe((tag) => {
        this.formTag.setValue({ description: tag.description });
      })
    }
  }

  ngOnInit(): void {
    let formGroupData = {
      description: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    };
    this.formTag = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formTag.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    if (this.new) {
      this.tagService.create(this.formTag.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/tags']);
        }
      }, (response) => {
        this.tagError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.tagService.update(this.id, this.formTag.value).subscribe((response) => {
        if(response.affected != undefined && response.affected > 0){
          this.router.navigate(['/tags']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/tags']); }

}
