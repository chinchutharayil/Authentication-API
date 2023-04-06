import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationMasterComponent } from './termination-master.component';

describe('TerminationMasterComponent', () => {
  let component: TerminationMasterComponent;
  let fixture: ComponentFixture<TerminationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminationMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
