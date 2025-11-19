import { Component } from '@angular/core';
import env from '../../../env';

@Component({
  selector: 'app-not-found.page',
  imports: [],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
})
export class NotFoundPage {
  public APP_NAME = env.APP_NAME;
}
