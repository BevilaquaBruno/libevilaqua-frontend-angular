import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateList } from 'src/environments/environments';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html'
})
export class FormPersonComponent {
  new: boolean = true;
  id: number = 0;

  stateList = StateList;

  formPerson!: FormGroup;
  personError = {
    error: false,
    message: ''
  };

  constructor(
    private personService: PersonService,
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
      this.personService.get(this.id).subscribe((person) => {
        this.formPerson.setValue({
          name: person.name, cpf: person.cpf, cep: person.cep, city: person.city,
          district: person.district, number: person.number, state: person.state, street: person.street,
          obs: person.obs
        });
      })
    }
  }

  ngOnInit(): void {
    let formGroupData = {
      name: ['', Validators.compose([Validators.required])],
      cpf: [''],
      cep: [''],
      city: [''],
      district: [''],
      number: [''],
      state: [''],
      street: [''],
      obs: [''],
    };
    this.formPerson = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formPerson.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    if (this.new) {
      this.personService.create(this.formPerson.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/pessoas']);
        }
      }, (response) => {
        this.personError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.personService.update(this.id, this.formPerson.value).subscribe((response) => {
        console.log(response);

        if (response.affected != undefined && response.affected > 0) {
          this.router.navigate(['/pessoas']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/pessoas']); }

}
