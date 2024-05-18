import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoansComponent } from './list-loans.component';

describe('ListLoansComponent', () => {
  let component: ListLoansComponent;
  let fixture: ComponentFixture<ListLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLoansComponent]
    });
    fixture = TestBed.createComponent(ListLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
