import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyResumeMasterComponent } from './duty-resume-master.component';

describe('DutyResumeMasterComponent', () => {
  let component: DutyResumeMasterComponent;
  let fixture: ComponentFixture<DutyResumeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyResumeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutyResumeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
