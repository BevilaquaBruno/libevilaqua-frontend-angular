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
import { TypeService } from '../services';
import { Type, TypeListResponse } from '../interfaces';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css'],
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
export class TypeListComponent implements OnInit {
  private typeService = inject(TypeService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'description', 'actions'];
  types$: Observable<Type[]> = of([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.loadTypes();
  }

  loadTypes() {
    this.typeService.findAll(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response: TypeListResponse) => {
        this.types$ = of(response.data);
        this.totalCount = response.count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading types:', error);
        this.types$ = of([]);
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTypes();
  }

  openCreateForm() {
    this.router.navigate(['/tipos/novo']);
  }

  openEditForm(type: Type) {
    this.router.navigate(['/tipos/editar', type.id]);
  }

  deleteType(type: Type) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Tipo',
        message: `Tem certeza que deseja excluir o tipo "${type.description}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.typeService.delete(type.id).subscribe({
          next: () => {
            this.loadTypes();
          },
          error: (error: any) => {
            console.error('Error deleting type:', error);
          }
        });
      }
    });
  }
}