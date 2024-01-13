import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAuthorComponent } from './detail-author.component';

describe('DetailAuthorComponent', () => {
  let component: DetailAuthorComponent;
  let fixture: ComponentFixture<DetailAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAuthorComponent]
    });
    fixture = TestBed.createComponent(DetailAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
