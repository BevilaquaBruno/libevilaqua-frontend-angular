import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTagComponent } from './detail-tag.component';

describe('DetailTagComponent', () => {
  let component: DetailTagComponent;
  let fixture: ComponentFixture<DetailTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTagComponent]
    });
    fixture = TestBed.createComponent(DetailTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
