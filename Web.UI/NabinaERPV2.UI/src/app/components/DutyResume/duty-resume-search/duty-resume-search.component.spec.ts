import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyResumeSearchComponent } from './duty-resume-search.component';

describe('DutyResumeSearchComponent', () => {
  let component: DutyResumeSearchComponent;
  let fixture: ComponentFixture<DutyResumeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyResumeSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutyResumeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
