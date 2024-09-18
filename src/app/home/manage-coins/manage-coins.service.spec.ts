import { TestBed } from '@angular/core/testing';

import { ManageCoinsService } from './manage-coins.service';

describe('ManageCoinsService', () => {
  let service: ManageCoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
