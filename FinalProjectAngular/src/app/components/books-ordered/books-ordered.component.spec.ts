import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksOrderedComponent } from './books-ordered.component';

describe('BooksOrderedComponent', () => {
  let component: BooksOrderedComponent;
  let fixture: ComponentFixture<BooksOrderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksOrderedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
