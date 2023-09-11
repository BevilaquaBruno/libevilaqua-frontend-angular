import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from '../usuario.interface';

@Component({
  selector: 'app-detail-usuario',
  templateUrl: './detail-usuario.component.html',
  styleUrls: ['./detail-usuario.component.css'],
})
export class DetailUsuarioComponent {
  user: UsuarioInterface = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(
    private service: UsuarioService,
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
      this.service.getUser(parseInt(tempId)).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
