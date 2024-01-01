import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEditoraComponent } from './detail-editora.component';

describe('DetailEditoraComponent', () => {
  let component: DetailEditoraComponent;
  let fixture: ComponentFixture<DetailEditoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEditoraComponent]
    });
    fixture = TestBed.createComponent(DetailEditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
