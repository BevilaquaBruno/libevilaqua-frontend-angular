import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorService } from '../services';
import { Author, AuthorListResponse } from '../interfaces';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    CommonModule
  ]
})
export class AuthorListComponent implements OnInit {
  private authorService = inject(AuthorService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'birth_date', 'death_date', 'actions'];
  authors$: Observable<Author[]> = of([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.findAll(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response: AuthorListResponse) => {
        this.authors$ = of(response.data);
        this.totalCount = response.count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading authors:', error);
        this.authors$ = of([]);
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAuthors();
  }

  openCreateForm() {
    this.router.navigate(['/autores/novo']);
  }

  openEditForm(author: Author) {
    this.router.navigate(['/autores/editar', author.id]);
  }

  formatDate(date: string | null): string {
    if (!date) {
      return '-';
    }

    const [year, month, day] = date.substring(0, 10).split('-');
    return day && month && year ? `${day}/${month}/${year}` : '-';
  }

  deleteAuthor(author: Author) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Autor',
        message: `Tem certeza que deseja excluir o autor "${author.name}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authorService.delete(author.id).subscribe({
          next: () => this.loadAuthors(),
          error: (error: any) => console.error('Error deleting author:', error)
        });
      }
    });
  }
}
