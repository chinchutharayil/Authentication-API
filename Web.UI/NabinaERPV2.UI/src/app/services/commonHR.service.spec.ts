import { TestBed } from '@angular/core/testing';

import {CommonHRService } from './commonHR.service';

describe('CommonHRService', () => {
  let service: CommonHRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonHRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
