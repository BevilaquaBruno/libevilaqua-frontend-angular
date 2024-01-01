import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditorasComponent } from './list-editoras.component';

describe('ListEditorasComponent', () => {
  let component: ListEditorasComponent;
  let fixture: ComponentFixture<ListEditorasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEditorasComponent]
    });
    fixture = TestBed.createComponent(ListEditorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
