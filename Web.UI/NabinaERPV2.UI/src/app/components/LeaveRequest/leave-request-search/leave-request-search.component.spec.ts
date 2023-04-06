import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestSearchComponent } from './leave-request-search.component';

describe('LeaveRequestSearchComponent', () => {
  let component: LeaveRequestSearchComponent;
  let fixture: ComponentFixture<LeaveRequestSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRequestSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
