import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationSearchComponent } from './termination-search.component';

describe('TerminationSearchComponent', () => {
  let component: TerminationSearchComponent;
  let fixture: ComponentFixture<TerminationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminationSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
