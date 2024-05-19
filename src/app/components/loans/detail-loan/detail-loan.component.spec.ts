import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLoanComponent } from './detail-loan.component';

describe('DetailLoanComponent', () => {
  let component: DetailLoanComponent;
  let fixture: ComponentFixture<DetailLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailLoanComponent]
    });
    fixture = TestBed.createComponent(DetailLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
