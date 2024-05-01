import { Component } from '@angular/core';
import { PersonInterface } from '../person.interface';
import { PersonService } from '../person.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
})
export class DetailPersonComponent {
  person: PersonInterface = {
    id: 0,
    name: '',
    cpf: null,
    cep: null,
    city: null,
    district: null,
    number: null,
    state: null,
    street: null,
    obs: null,
  };

  personFound: boolean = true;

  constructor(
    private personService: PersonService,
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
      this.personService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.personFound = false;
          else
            this.person = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToPersonEdit(){
    this.router.navigate([`/persons/${this.person.id}/editar`]);
  }

}
