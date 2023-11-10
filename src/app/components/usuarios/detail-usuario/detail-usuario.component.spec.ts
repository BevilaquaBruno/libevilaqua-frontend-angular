import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUsuarioComponent } from './detail-usuario.component';

describe('DetailUsuarioComponent', () => {
  let component: DetailUsuarioComponent;
  let fixture: ComponentFixture<DetailUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUsuarioComponent]
    });
    fixture = TestBed.createComponent(DetailUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
