import { TestBed } from '@angular/core/testing';

import { AuthenticationOtpService } from './authentication-otp.service';

describe('AuthenticationOtpService', () => {
  let service: AuthenticationOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
