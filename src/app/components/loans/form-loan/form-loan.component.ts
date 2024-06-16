import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../loan.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../book/book.service';
import { PersonService } from '../../person/person.service';
import { BookInterface } from '../../book/book.interface';
import { PersonInterface } from '../../person/person.interface';

@Component({
  selector: 'app-form-loan',
  templateUrl: './form-loan.component.html'
})
export class FormLoanComponent {
  new: boolean = true;
  id: number = 0;

  listBooks: BookInterface[] = [];
  listPeople: PersonInterface[] = [];

  formLoan!: FormGroup;
  formError = {
    error: false,
    message: ''
  };

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private personService: PersonService,
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
      this.loanService.get(this.id).subscribe((loan) => {
        this.formLoan.setValue({ description: loan.description, loan_date: loan.loan_date, must_return_date: loan.must_return_date, return_date: loan.return_date, book: loan.book, person: loan.person });
      });
    }
  }

  ngOnInit(): void {
    this.bookService.list(1, 1000, null).subscribe((books) => this.listBooks = books.data);
    this.personService.list(1, 1000).subscribe((person) => this.listPeople = person.data);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let formattedDate = dd + '/' + mm + '/' + yyyy;
    let formGroupData = {
      description: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      return_date: [null],
      must_return_date: [null],
      loan_date: [formattedDate],
      bookId: [null],
      personId: [null]
    };
    this.formLoan = this.formBuilder.group(formGroupData);
  }

  saveButtonClass() {
    if (this.formLoan.valid)
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  save() {
    let sentForm = structuredClone(this.formLoan.value);

    if(sentForm.return_date == '') sentForm.return_date = null;
    if(sentForm.must_return_date == '') sentForm.must_return_date = null;
    if(sentForm.loan_date == '') sentForm.loan_date = null;
    
    console.log(sentForm);
    
    if (this.new) {
      this.loanService.create(this.formLoan.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/emprestimos']);
        }
      }, (response) => {
        this.formError = {
          error: true,
          message: response.error.message,
        }
      });
    } else {
      this.loanService.update(this.id, this.formLoan.value).subscribe((response) => {
        if (response.id != undefined) {
          this.router.navigate(['/emprestimos']);
        }
      });
    }

  }

  goBack() { this.router.navigate(['/emprestimos']); }

}
