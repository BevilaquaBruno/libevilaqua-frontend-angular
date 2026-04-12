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
import { PublisherService } from '../services';
import { Publisher, PublisherListResponse } from '../interfaces';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css'],
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
export class PublisherListComponent implements OnInit {
  private publisherService = inject(PublisherService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'country', 'actions'];
  publishers$: Observable<Publisher[]> = of([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.loadPublishers();
  }

  loadPublishers() {
    this.publisherService.findAll(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response: PublisherListResponse) => {
        this.publishers$ = of(response.data);
        this.totalCount = response.count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading publishers:', error);
        this.publishers$ = of([]);
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPublishers();
  }

  openCreateForm() {
    this.router.navigate(['/editoras/novo']);
  }

  openEditForm(publisher: Publisher) {
    this.router.navigate(['/editoras/editar', publisher.id]);
  }

  deletePublisher(publisher: Publisher) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir Editora',
        message: `Tem certeza que deseja excluir a editora "${publisher.name}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.publisherService.delete(publisher.id).subscribe({
          next: () => {
            this.loadPublishers();
          },
          error: (error: any) => {
            console.error('Error deleting publisher:', error);
          }
        });
      }
    });
  }
}