import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryComponent } from './salary-info.component';

describe('AddSectionComponent', () => {
  let component: EmployeeSalaryComponent;
  let fixture: ComponentFixture<EmployeeSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
