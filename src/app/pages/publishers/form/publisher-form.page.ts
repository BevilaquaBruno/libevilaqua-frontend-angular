import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PublisherService } from '../services';
import { Publisher } from '../interfaces';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.page.html',
  styleUrls: ['./publisher-form.page.scss'],
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
export class PublisherFormPage implements OnInit, AfterViewInit {
  @ViewChild('nameInput') nameInput!: ElementRef;

  private fb = inject(FormBuilder);
  private publisherService = inject(PublisherService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  publisherForm: FormGroup;
  isEdit = false;
  publisherId: number | null = null;
  loading = false;

  constructor() {
    this.publisherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      country: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.publisherId = +id;
      this.loadPublisher(this.publisherId);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.nameInput?.nativeElement?.focus();
    });
  }

  loadPublisher(id: number) {
    this.loading = true;
    this.publisherService.findOne(id).subscribe({
      next: (publisher: Publisher) => {
        this.publisherForm.patchValue({
          name: publisher.name,
          country: publisher.country
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading publisher:', error);
        this.loading = false;
        this.router.navigate(['/editoras']);
      }
    });
  }

  onSubmit() {
    if (this.publisherForm.valid) {
      this.loading = true;
      const formValue = this.publisherForm.value;

      if (this.isEdit && this.publisherId) {
        this.publisherService.update(this.publisherId, {
          id: this.publisherId,
          name: formValue.name,
          country: formValue.country
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/editoras']);
          },
          error: (error) => {
            console.error('Error updating publisher:', error);
            this.loading = false;
          }
        });
      } else {
        this.publisherService.create({
          name: formValue.name,
          country: formValue.country
        }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/editoras']);
          },
          error: (error) => {
            console.error('Error creating publisher:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/editoras']);
  }

  get title() {
    return this.isEdit ? 'Editar Editora' : 'Nova Editora';
  }

  get submitButtonText() {
    return this.isEdit ? 'Salvar' : 'Criar';
  }
}