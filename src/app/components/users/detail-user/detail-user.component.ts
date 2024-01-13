import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: [],
})
export class DetailUserComponent {
  user: UserInterface = {
    id: 0,
    name: '',
    email: ''
  };

  userFound: boolean = true;

  constructor(
    private service: UserService,
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
          if(data === null)
            this.userFound = false;
          else
            this.user = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToUserEdit(){
    this.router.navigate([`/usuarios/${this.user.id}/editar`]);
  }
}
