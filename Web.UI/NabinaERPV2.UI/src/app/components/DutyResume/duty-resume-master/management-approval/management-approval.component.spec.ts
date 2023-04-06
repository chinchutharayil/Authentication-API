import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementApprovalComponent } from './management-approval.component';

describe('ManagementApprovalComponent', () => {
  let component: ManagementApprovalComponent;
  let fixture: ComponentFixture<ManagementApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
