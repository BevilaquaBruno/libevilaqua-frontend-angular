import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../type.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-type',
  templateUrl: './form-type.component.html',
})
export class FormTypeComponent {
  new: boolean = true;
  id: number = 0;

  formType!: FormGroup;
  typeError = {
    error: false,
    message: ''
  };

  constructor(
    private typeService: TypeService,
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
      this.typeService.get(this.id).subscribe((type) => {
        this.formType.setValue({ description: type.description });
      })
    }
  }

  ngOnInit(): void {
    let formGroupData = {
      description: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    };
    this.formType = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formType.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    if (this.new) {
      this.typeService.create(this.formType.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/tipos']);
        }
      }, (response) => {
        this.typeError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.typeService.update(this.id, this.formType.value).subscribe((response) => {
        if(response.affected != undefined && response.affected > 0){
          this.router.navigate(['/tipos']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/tipos']); }

}
