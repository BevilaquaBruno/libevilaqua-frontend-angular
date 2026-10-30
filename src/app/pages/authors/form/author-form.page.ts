import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService } from '../services';
import { Author } from '../interfaces';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.page.html',
  styleUrls: ['./author-form.page.scss'],
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
export class AuthorFormPage implements OnInit, AfterViewInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  private fb = inject(FormBuilder);
  private authorService = inject(AuthorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  authorForm: FormGroup;
  isEdit = false;
  authorId: number | null = null;
  loading = false;

  constructor() {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      birth_date: ['', this.dateValidator()],
      death_date: ['', this.dateValidator()],
      bio: ['', Validators.maxLength(500)]
    });
  }

  private dateValidator() {
    return Validators.pattern(/^\d{4}-\d{2}-\d{2}$/);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.authorId = +id;
      this.loadAuthor(this.authorId);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.nameInput?.nativeElement?.focus());
  }

  loadAuthor(id: number) {
    this.loading = true;
    this.authorService.findOne(id).subscribe({
      next: (author: Author) => {
        this.authorForm.patchValue({
          ...author,
          birth_date: this.toDateInputValue(author.birth_date),
          death_date: this.toDateInputValue(author.death_date)
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading author:', error);
        this.loading = false;
        this.router.navigate(['/autores']);
      }
    });
  }

  private toDateInputValue(date: string | null): string {
    return date ? date.substring(0, 10) : '';
  }

  onSubmit() {
    if (this.authorForm.valid) {
      const { name, birth_date, death_date, bio } = this.authorForm.value;
      const formValue = {
        name,
        ...(birth_date ? { birth_date } : {}),
        ...(death_date ? { death_date } : {}),
        ...(bio ? { bio } : {})
      };
      this.loading = true;
      const request = this.isEdit && this.authorId
        ? this.authorService.update(this.authorId, { id: this.authorId, ...formValue })
        : this.authorService.create(formValue);

      request.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/autores']);
        },
        error: (error) => {
          console.error(this.isEdit ? 'Error updating author:' : 'Error creating author:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/autores']);
  }

  get title() {
    return this.isEdit ? 'Editar Autor' : 'Novo Autor';
  }

  get submitButtonText() {
    return this.isEdit ? 'Salvar' : 'Criar';
  }
}
