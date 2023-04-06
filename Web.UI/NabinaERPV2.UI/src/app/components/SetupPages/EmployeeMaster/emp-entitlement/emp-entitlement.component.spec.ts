import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEntitlementComponent } from './emp-entitlement.component';

describe('EmpEntitlementComponent', () => {
  let component: EmpEntitlementComponent;
  let fixture: ComponentFixture<EmpEntitlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpEntitlementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
