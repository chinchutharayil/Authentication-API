import { TestBed } from '@angular/core/testing';

import { DutyresumeService } from './dutyresume.service';

describe('DutyresumeService', () => {
  let service: DutyresumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DutyresumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
