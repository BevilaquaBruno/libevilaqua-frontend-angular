import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditoraComponent } from './form-editora.component';

describe('FormEditoraComponent', () => {
  let component: FormEditoraComponent;
  let fixture: ComponentFixture<FormEditoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditoraComponent]
    });
    fixture = TestBed.createComponent(FormEditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
