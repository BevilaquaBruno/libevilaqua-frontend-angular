import { Component } from '@angular/core';
import { TipoInterface } from '../tipo.interface';
import { TipoService } from '../tipo.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-tipo',
  templateUrl: './detail-tipo.component.html'
})
export class DetailTipoComponent {

  type: TipoInterface = {
    id: 0,
    description: ''
  };

  typeFound: boolean = true;

  constructor(
    private typeService: TipoService,
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
      this.typeService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.typeFound = false;
          else
            this.type = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToTypeEdit(){
    this.router.navigate([`/tipos/${this.type.id}/editar`]);
  }
}
