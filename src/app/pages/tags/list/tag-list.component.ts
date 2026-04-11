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
import { TagService } from '../services';
import { Tag, TagListResponse } from '../interfaces';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
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
export class TagListComponent implements OnInit {
  private tagService = inject(TagService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'description', 'actions'];
  tags$: Observable<Tag[]> = of([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.tagService.findAll(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response: TagListResponse) => {
        this.tags$ = of(response.data);
        this.totalCount = response.count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading tags:', error);
        this.tags$ = of([]);
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTags();
  }

  openCreateForm() {
    this.router.navigate(['/tags/novo']);
  }

  openEditForm(tag: Tag) {
    this.router.navigate(['/tags/editar', tag.id]);
  }

  deleteTag(tag: Tag) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Tag',
        message: `Tem certeza que deseja excluir a tag "${tag.description}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.tagService.delete(tag.id).subscribe({
          next: () => {
            this.loadTags();
          },
          error: (error: any) => {
            console.error('Error deleting tag:', error);
          }
        });
      }
    });
  }
}