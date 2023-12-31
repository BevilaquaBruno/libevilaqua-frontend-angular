import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenreComponent } from './form-genre.component';

describe('FormGenreComponent', () => {
  let component: FormGenreComponent;
  let fixture: ComponentFixture<FormGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormGenreComponent]
    });
    fixture = TestBed.createComponent(FormGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
