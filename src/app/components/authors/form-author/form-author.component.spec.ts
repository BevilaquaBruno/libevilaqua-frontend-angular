import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuthorComponent } from './form-author.component';

describe('FormAuthorComponent', () => {
  let component: FormAuthorComponent;
  let fixture: ComponentFixture<FormAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAuthorComponent]
    });
    fixture = TestBed.createComponent(FormAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
