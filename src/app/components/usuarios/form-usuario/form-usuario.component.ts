import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: []
})
export class FormUsuarioComponent {

  new: boolean = true;
  id: number = 0;

  constructor(
    private service: UsuarioService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appService.isValid().subscribe(
      () => { },
      (error) => {
        if (error.status === 401) this.router.navigate(['/login']);
      }
    );

    if('cadastrar' == this.route.snapshot.routeConfig?.path){
      this.new = true;
      this.id = 0;
    }else if(':id/editar'){
      this.new = false;
      this.id = this.route.snapshot.params['id'];
    }
  }

}
