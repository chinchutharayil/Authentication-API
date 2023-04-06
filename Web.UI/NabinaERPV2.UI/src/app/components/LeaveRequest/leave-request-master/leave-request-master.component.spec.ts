import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { LeaveRequestMasterComponent } from './leave-request-master.component';

describe('LeaveRequestMasterComponent', () => {
  let component: LeaveRequestMasterComponent;
  let fixture: ComponentFixture<LeaveRequestMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRequestMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
