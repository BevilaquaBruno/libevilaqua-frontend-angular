import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatGridListModule } from "@angular/material/grid-list";
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
import { GenreService } from '../services';
import { Genre, GenreListResponse } from '../interfaces';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
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
export class GenreListComponent implements OnInit {
  private genreService = inject(GenreService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'description', 'actions'];
  genres$: Observable<Genre[]> = of([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.loadGenres();
  }

  loadGenres() {
    this.genreService.findAll(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response: GenreListResponse) => {
        this.genres$ = of(response.data);
        this.totalCount = response.count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading genres:', error);
        this.genres$ = of([]);
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadGenres();
  }

  openCreateForm() {
    this.router.navigate(['/generos/novo']);
  }

  openEditForm(genre: Genre) {
    this.router.navigate(['/generos/editar', genre.id]);
  }

  deleteGenre(genre: Genre) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Gênero',
        message: `Tem certeza que deseja excluir o gênero "${genre.description}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.genreService.delete(genre.id).subscribe({
          next: () => {
            this.loadGenres();
          },
          error: (error: any) => {
            console.error('Error deleting genre:', error);
          }
        });
      }
    });
  }
}