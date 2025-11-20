import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAccessPage } from './confirm-access.page';

describe('ConfirmAccessPage', () => {
  let component: ConfirmAccessPage;
  let fixture: ComponentFixture<ConfirmAccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAccessPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
