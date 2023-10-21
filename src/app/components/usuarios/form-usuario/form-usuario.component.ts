import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: []
})
export class FormUsuarioComponent {

  new: boolean = true;
  id: number = 0;

  formUser!: FormGroup;
  loginError: number = 0;

  constructor(
    private service: UsuarioService,
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
      this.service.getUser(this.id).subscribe((user) => {
        this.formUser.setValue({ name: user.name, email: user.email, password: '', verify_password: '' });
      })
    }
  }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      verify_password: ['', Validators.compose([Validators.required])],
    });
  }

  saveButtonClass (){
    if(this.formUser.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  saveUser(){
    if (this.new) {
      this.service.createUser(this.formUser.value).subscribe((response) => {
        console.log(response);
      });
    }else{
      //editar usuário
    }

  }

  goBack(){ this.router.navigate(['/usuarios']); }

}
