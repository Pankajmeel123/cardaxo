import { TestBed } from '@angular/core/testing';

import { RechargeGuard } from './recharge.guard';

describe('RechargeGuard', () => {
  let guard: RechargeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RechargeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
