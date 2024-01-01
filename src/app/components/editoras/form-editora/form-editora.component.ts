import { PublisherService } from './../publisher.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-editora',
  templateUrl: './form-editora.component.html'
})
export class FormEditoraComponent {
  new: boolean = true;
  id: number = 0;

  formPublisher!: FormGroup;
  publisherError = {
    error: false,
    message: ''
  };

  constructor(
    private PublisherService: PublisherService,
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
      this.PublisherService.get(this.id).subscribe((publisher) => {
        this.formPublisher.setValue({ name: publisher.name, country: publisher.country });
      })
    }
  }

  ngOnInit(): void {
    let formGroupData = {
      name: ['', Validators.compose([Validators.required])],
      country: [''],
    };
    this.formPublisher = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formPublisher.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    if (this.new) {
      this.PublisherService.create(this.formPublisher.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/editoras']);
        }
      }, (response) => {
        this.publisherError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.PublisherService.update(this.id, this.formPublisher.value).subscribe((response) => {
        console.log(response);

        if(response.affected != undefined && response.affected > 0){
          this.router.navigate(['/editoras']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/editoras']); }

}
