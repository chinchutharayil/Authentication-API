import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationsListComponent } from './designation-list.component';

describe('DesignationsListComponent', () => {
  let component: DesignationsListComponent;
  let fixture: ComponentFixture<DesignationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
