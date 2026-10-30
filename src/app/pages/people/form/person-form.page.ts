import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../services';
import { Person } from '../interfaces';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.page.html',
  styleUrls: ['./person-form.page.scss'],
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
export class PersonFormPage implements OnInit, AfterViewInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  private fb = inject(FormBuilder);
  private personService = inject(PersonService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  personForm: FormGroup;
  isEdit = false;
  personId: number | null = null;
  loading = false;

  constructor() {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      document: ['', Validators.maxLength(50)],
      zip_code: ['', Validators.maxLength(15)],
      state: ['', Validators.maxLength(30)],
      city: ['', Validators.maxLength(30)],
      district: ['', Validators.maxLength(100)],
      street: ['', Validators.maxLength(100)],
      number: ['', [Validators.maxLength(5), Validators.pattern(/^\d{1,5}$|^SN$|^S\/N$/)]],
      obs: ['', Validators.maxLength(500)],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.pattern(/^\d+$/), Validators.maxLength(20)]],
      country: ['', Validators.maxLength(50)]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.personId = +id;
      this.loadPerson(this.personId);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.nameInput?.nativeElement?.focus());
  }

  loadPerson(id: number) {
    this.loading = true;
    this.personService.findOne(id).subscribe({
      next: (person: Person) => {
        this.personForm.patchValue(person);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading person:', error);
        this.loading = false;
        this.router.navigate(['/pessoas']);
      }
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      this.loading = true;
      const formValue = this.personForm.value;
      const request = this.isEdit && this.personId
        ? this.personService.update(this.personId, { id: this.personId, ...formValue })
        : this.personService.create(formValue);

      request.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/pessoas']);
        },
        error: (error) => {
          console.error(this.isEdit ? 'Error updating person:' : 'Error creating person:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/pessoas']);
  }

  get title() {
    return this.isEdit ? 'Editar Pessoa' : 'Nova Pessoa';
  }

  get submitButtonText() {
    return this.isEdit ? 'Salvar' : 'Criar';
  }
}
