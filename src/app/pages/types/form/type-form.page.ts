import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from '../services';
import { Type } from '../interfaces';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.page.html',
  styleUrls: ['./type-form.page.scss'],
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
export class TypeFormPage implements OnInit, AfterViewInit {
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;

  private fb = inject(FormBuilder);
  private typeService = inject(TypeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  typeForm: FormGroup;
  isEdit = false;
  typeId: number | null = null;
  loading = false;

  constructor() {
    this.typeForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.typeId = +id;
      this.loadType(this.typeId);
    }
  }

  ngAfterViewInit() {
    // Foca no campo de descrição após a view ser inicializada
    setTimeout(() => {
      this.descriptionInput?.nativeElement?.focus();
    });
  }

  loadType(id: number) {
    this.loading = true;
    this.typeService.findOne(id).subscribe({
      next: (type: Type) => {
        this.typeForm.patchValue({
          description: type.description
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading type:', error);
        this.loading = false;
        this.router.navigate(['/tipos']);
      }
    });
  }

  onSubmit() {
    if (this.typeForm.valid) {
      this.loading = true;
      const formValue = this.typeForm.value;

      if (this.isEdit && this.typeId) {
        this.typeService.update(this.typeId, {
          id: this.typeId,
          description: formValue.description
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/tipos']);
          },
          error: (error) => {
            console.error('Error updating type:', error);
            this.loading = false;
          }
        });
      } else {
        this.typeService.create({
          description: formValue.description
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/tipos']);
          },
          error: (error) => {
            console.error('Error creating type:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/tipos']);
  }

  get title() {
    return this.isEdit ? 'Editar Tipo' : 'Novo Tipo';
  }

  get submitButtonText() {
    return this.isEdit ? 'Salvar' : 'Criar';
  }
}
