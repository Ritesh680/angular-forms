import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperFooterComponent } from './stepper-footer.component';

describe('StepperFooterComponent', () => {
  let component: StepperFooterComponent;
  let fixture: ComponentFixture<StepperFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
