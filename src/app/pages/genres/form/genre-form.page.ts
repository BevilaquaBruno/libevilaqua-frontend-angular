import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { GenreService } from '../services';
import { Genre } from '../interfaces';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.page.html',
  styleUrls: ['./genre-form.page.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule
  ]
})
export class GenreFormPage implements OnInit, AfterViewInit {
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;

  private fb = inject(FormBuilder);
  private genreService = inject(GenreService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  genreForm: FormGroup;
  isEdit = false;
  genreId: number | null = null;
  loading = false;

  constructor() {
    this.genreForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.genreId = +id;
      this.loadGenre(this.genreId);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.descriptionInput?.nativeElement?.focus();
    });
  }

  loadGenre(id: number) {
    this.loading = true;
    this.genreService.findOne(id).subscribe({
      next: (genre: Genre) => {
        this.genreForm.patchValue({
          description: genre.description
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading genre:', error);
        this.loading = false;
        this.router.navigate(['/generos']);
      }
    });
  }

  onSubmit() {
    if (this.genreForm.valid) {
      this.loading = true;
      const formValue = this.genreForm.value;

      if (this.isEdit && this.genreId) {
        this.genreService.update(this.genreId, {
          id: this.genreId,
          description: formValue.description
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/generos']);
          },
          error: (error) => {
            console.error('Error updating genre:', error);
            this.loading = false;
          }
        });
      } else {
        this.genreService.create({
          description: formValue.description
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/generos']);
          },
          error: (error) => {
            console.error('Error creating genre:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/generos']);
  }

  get title() {
    return this.isEdit ? 'Editar Gênero' : 'Novo Gênero';
  }

  get submitButtonText() {
    return this.isEdit ? 'Salvar' : 'Criar';
  }
}