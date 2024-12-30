import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BookInterface } from '../../book/book.interface';
import { PersonInterface } from '../../person/person.interface';
import { LoanFiltersRaw, LoanFiltersToString, LoanInterface } from '../loan.interface';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { PopupComponent } from '../../general/popup/popup.component';
import { BookService } from '../../book/book.service';
import { PersonService } from '../../person/person.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { LoanService } from '../loan.service';
import { getFormattedDate } from 'src/assets/helpers';

@Component({
  selector: 'app-list-loans',
  templateUrl: './list-loans.component.html'
})
export class ListLoansComponent {
  listLoans: LoanInterface[] = [];
  listBooks: BookInterface[] = [];
  listPeople: PersonInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0, message: '' };
  returnBookData = { id: 0, message: '' };
  selectedFilters: LoanFiltersRaw = {
    description: null,
    start_date: null,
    end_date: null,
    book: null,
    person: null,
    returned: null
  };
  
  getFormattedDate = getFormattedDate;

  @ViewChildren(ConfirmDialogComponent) confirmationDialog!: QueryList<ConfirmDialogComponent>;
  @ViewChildren(PopupComponent) popup!: QueryList<PopupComponent>;

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private personService: PersonService,
    private appService: AppService,
    private router: Router
  ) {
    this.appService.isValid().subscribe(
      () => { },
      (error) => {
        if (error.status === 401) this.router.navigate(['/login']);
      }
    );
    const storageItensPerPage = localStorage.getItem('itensPerPage');
    if (storageItensPerPage != null) {
      this.itensPerPage = parseInt(storageItensPerPage);
    }
  }

  ngOnInit(): void {
    this.updateLoanList();
    this.bookService.list(1, 1000, null).subscribe((books) => this.listBooks = books.data);
    this.personService.list(1, 1000).subscribe((people) => this.listPeople = people.data);
  }

  openNewLoan() {
    this.router.navigate(['/emprestimos/cadastrar']);
  }

  openConfirmDeleteLoan(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.first.openModal();
  }

  openConfirmReturnLoan(id: number) {
    this.returnBookData.id = id;
    this.confirmationDialog.last.openModal();
  }

  finishDeleteLoan() {
    this.deleteData.id = 0;
    this.confirmationDialog.first.closeModal();
    this.updateLoanList();
  }

  finishReturnLoan() {
    this.returnBookData.id = 0;
    this.confirmationDialog.last.closeModal();
    this.updateLoanList();
  }

  confirmDeleteLoan() {
    if (this.deleteData.id != 0) {
      this.loanService.delete(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeleteLoan();
          }
        }, (e) => {
          this.deleteData.message = e.error.message;
          this.popup.first.initPopup();
          this.popup.first.showPopup();
        });
    }
  }

  confirmReturnLoan() {
    if (this.returnBookData.id != 0) {
      this.loanService.return(this.returnBookData.id).subscribe(
        (success) => {
          if (success.id != 0) {
            this.finishReturnLoan();
          }
        }, (e) => {
          this.returnBookData.message = e.error.message;
          this.popup.last.initPopup();
          this.popup.last.showPopup();
        });
    }
  }

  updateLoanList() {
    this.loanService
      .list(this.currentPage, this.itensPerPage, this.convertSelectedFilters(this.selectedFilters))
      .subscribe((data) => {
        this.maxRegisters = data.count;
        this.listLoans = data.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
        this.maxPages = calcMaxPage;
      });
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updateLoanList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updateLoanList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updateLoanList();
  }

  private convertSelectedFilters(data: LoanFiltersRaw): LoanFiltersToString {
    let stringFilters: LoanFiltersToString = { data: {} };

    if (data.description != undefined)
      stringFilters.data.description = data.description;

    if (data.start_date != undefined)
      stringFilters.data.start_date = data.start_date;

    if (data.end_date != undefined)
      stringFilters.data.end_date = data.end_date;

    if (data.book != undefined)
      stringFilters.data.book = data.book.toString();

    if (data.person != undefined)
      stringFilters.data.person = data.person.toString();
    
    if (data.returned != null)
      if (data.returned == false)
        stringFilters.data.returned = '0';
      else
        stringFilters.data.returned = '1';  

    return stringFilters;
  }
}
