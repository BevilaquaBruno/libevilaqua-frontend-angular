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

  action: string = 'new';

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
    if('cadastrar' == this.route.snapshot.routeConfig?.path)
      this.action = 'new';
    else
      this.action = 'edit';
  }


}
