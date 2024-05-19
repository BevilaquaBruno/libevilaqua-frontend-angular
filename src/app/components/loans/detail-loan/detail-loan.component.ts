import { Component } from '@angular/core';
import { LoanInterface } from '../loan.interface';
import { LoanService } from '../loan.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuthorListJoined, getFormattedDate } from 'src/assets/helpers';
import { AuthorInterface } from '../../authors/author.interface';

@Component({
  selector: 'app-detail-loan',
  templateUrl: './detail-loan.component.html'
})
export class DetailLoanComponent {

  loan: LoanInterface = {
    id: 0,
    description: '',
    return_date: '',
    must_return_date: '',
    loan_date: '',
    book: {
      id: 0,
      title: '',
      edition: null,
      isbn: null,
      number_pages: null,
      release_year: null,
      obs: null,
      genre: null,
      publisher: null,
      type: null,
      tags: [],
      authors: []
    },
    person: {
      id: 0,
      name: '',
      cpf: null,
      cep: null,
      state: null,
      city: null,
      district: null,
      street: null,
      number: null,
      obs: null
    }
  };

  loanFound: boolean = true;

  getFormattedDate = getFormattedDate;
  getAuthorListJoined = getAuthorListJoined;

  constructor(
    private loanService: LoanService,
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
      this.loanService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.loanFound = false;
          else
            this.loan = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToLoanEdit(){
    this.router.navigate([`/emprestimos/${this.loan.id}/editar`]);
  }

}
