import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTipoComponent } from './detail-tipo.component';

describe('DetailTipoComponent', () => {
  let component: DetailTipoComponent;
  let fixture: ComponentFixture<DetailTipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTipoComponent]
    });
    fixture = TestBed.createComponent(DetailTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
