import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputFieldComponent } from './table-input-field.component';

describe('TableInputFieldComponent', () => {
  let component: TableInputFieldComponent;
  let fixture: ComponentFixture<TableInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInputFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
