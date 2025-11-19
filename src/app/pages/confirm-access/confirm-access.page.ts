import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import env from '../../../env';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: 'app-confirm-access.page',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
  ],
  templateUrl: './confirm-access.page.html',
  styleUrl: './confirm-access.page.scss',
})
export class ConfirmAccessPage implements OnInit {
  public APP_NAME = env.APP_NAME;
  public displayError = signal('');
  public displaySuccessMessage = signal('');
  public isTokenConfirmed = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const urlToken = this.route.snapshot.queryParamMap.get('token');
    const urlEmail = this.route.snapshot.queryParamMap.get('email');;
    if (urlEmail && urlToken) {
      this.authService.confirmEmail(urlEmail, urlToken).subscribe({
        next: (data) => {
          if (200 == data.statusCode) {
            this.displaySuccessMessage.set('E-mail verificado com sucesso! Clique no botão abaixo para entrar no sistema.');
            this.isTokenConfirmed.set(true);
          }
        },
        error: (error) => {
          let errorMessage = '';
          if (error.error.message && 401 != error.status)
            errorMessage = error.error.message
          else
            errorMessage = 'Ocorreu algum problema com a verificação do e-mail.';

          this.displayError.set(errorMessage);
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
