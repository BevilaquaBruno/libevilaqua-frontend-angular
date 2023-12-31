import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGenresComponent } from './list-genres.component';

describe('ListGenresComponent', () => {
  let component: ListGenresComponent;
  let fixture: ComponentFixture<ListGenresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListGenresComponent]
    });
    fixture = TestBed.createComponent(ListGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
