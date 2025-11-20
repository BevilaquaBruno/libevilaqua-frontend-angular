import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLibraryPage } from './new-library.page';

describe('NewLibraryPage', () => {
  let component: NewLibraryPage;
  let fixture: ComponentFixture<NewLibraryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLibraryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
