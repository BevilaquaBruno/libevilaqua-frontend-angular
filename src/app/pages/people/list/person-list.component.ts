import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PersonService } from '../services';
import { Person, PersonListResponse } from '../interfaces';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  imports: [
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ]
})
export class PersonListComponent implements OnInit {
  private personService = inject(PersonService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'document', 'email', 'phone', 'actions'];
  people$: Observable<Person[]> = of([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.findAll(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response: PersonListResponse) => {
        this.people$ = of(response.data);
        this.totalCount = response.count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading people:', error);
        this.people$ = of([]);
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPeople();
  }

  openCreateForm() {
    this.router.navigate(['/pessoas/novo']);
  }

  openEditForm(person: Person) {
    this.router.navigate(['/pessoas/editar', person.id]);
  }

  deletePerson(person: Person) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Pessoa',
        message: `Tem certeza que deseja excluir a pessoa "${person.name}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.personService.delete(person.id).subscribe({
          next: () => this.loadPeople(),
          error: (error: any) => console.error('Error deleting person:', error)
        });
      }
    });
  }
}
