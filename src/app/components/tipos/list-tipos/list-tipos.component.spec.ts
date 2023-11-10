import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTiposComponent } from './list-tipos.component';

describe('ListTiposComponent', () => {
  let component: ListTiposComponent;
  let fixture: ComponentFixture<ListTiposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTiposComponent]
    });
    fixture = TestBed.createComponent(ListTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
