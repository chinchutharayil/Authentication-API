import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsDeptComponent } from './accounts-dept.component';

describe('AccountsDeptComponent', () => {
  let component: AccountsDeptComponent;
  let fixture: ComponentFixture<AccountsDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsDeptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
