import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalHistoryComponent } from './appraisal-history.component';

describe('AppraisalHistoryComponent', () => {
  let component: AppraisalHistoryComponent;
  let fixture: ComponentFixture<AppraisalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppraisalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
