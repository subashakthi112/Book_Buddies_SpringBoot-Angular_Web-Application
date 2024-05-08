import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessStockDisplayComponent } from './less-stock-display.component';

describe('LessStockDisplayComponent', () => {
  let component: LessStockDisplayComponent;
  let fixture: ComponentFixture<LessStockDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessStockDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessStockDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
