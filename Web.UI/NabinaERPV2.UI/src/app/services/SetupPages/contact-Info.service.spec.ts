import { TestBed } from '@angular/core/testing';

import { ContactInfoService } from './contact-Info.service';

describe('ContactInfoService', () => {
  let service: ContactInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
