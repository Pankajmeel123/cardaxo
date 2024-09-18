import { TestBed } from '@angular/core/testing';

import { VeriffService } from './veriff.service';

describe('VeriffService', () => {
  let service: VeriffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeriffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
