import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDepartmentComponent } from './personnel-department.component';

describe('PersonnelDepartmentComponent', () => {
  let component: PersonnelDepartmentComponent;
  let fixture: ComponentFixture<PersonnelDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
