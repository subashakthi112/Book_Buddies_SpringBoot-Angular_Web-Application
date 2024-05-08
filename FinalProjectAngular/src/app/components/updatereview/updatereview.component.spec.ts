import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatereviewComponent } from './updatereview.component';

describe('UpdatereviewComponent', () => {
  let component: UpdatereviewComponent;
  let fixture: ComponentFixture<UpdatereviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatereviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
