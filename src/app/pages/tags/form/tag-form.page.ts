import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../services';
import { Tag } from '../interfaces';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.page.html',
  styleUrls: ['./tag-form.page.scss'],
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
export class TagFormPage implements OnInit, AfterViewInit {
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;

  private fb = inject(FormBuilder);
  private tagService = inject(TagService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  tagForm: FormGroup;
  isEdit = false;
  tagId: number | null = null;
  loading = false;

  constructor() {
    this.tagForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.tagId = +id;
      this.loadTag(this.tagId);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.descriptionInput?.nativeElement?.focus();
    });
  }

  loadTag(id: number) {
    this.loading = true;
    this.tagService.findOne(id).subscribe({
      next: (tag: Tag) => {
        this.tagForm.patchValue({
          description: tag.description
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tag:', error);
        this.loading = false;
        this.router.navigate(['/tags']);
      }
    });
  }

  onSubmit() {
    if (this.tagForm.valid) {
      this.loading = true;
      const formValue = this.tagForm.value;

      if (this.isEdit && this.tagId) {
        this.tagService.update(this.tagId, {
          id: this.tagId,
          description: formValue.description
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/tags']);
          },
          error: (error) => {
            console.error('Error updating tag:', error);
            this.loading = false;
          }
        });
      } else {
        this.tagService.create({
          description: formValue.description
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/tags']);
          },
          error: (error) => {
            console.error('Error creating tag:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/tags']);
  }

  get title() {
    return this.isEdit ? 'Editar Tag' : 'Nova Tag';
  }

  get submitButtonText() {
    return this.isEdit ? 'Salvar' : 'Criar';
  }
}