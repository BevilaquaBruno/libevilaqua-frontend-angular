import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetPasswordPage } from './send-reset-password.page';

describe('SendResetPasswordPage', () => {
  let component: SendResetPasswordPage;
  let fixture: ComponentFixture<SendResetPasswordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendResetPasswordPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendResetPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
