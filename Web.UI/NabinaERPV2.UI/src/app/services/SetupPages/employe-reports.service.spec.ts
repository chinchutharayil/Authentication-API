import { TestBed } from '@angular/core/testing';

import { EmployeReportsService } from './employe-reports.service';

describe('EmployeReportsService', () => {
  let service: EmployeReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
