import { TestBed } from '@angular/core/testing';

import { CheckOutServicesService } from './check-out-services.service';

describe('CheckOutServicesService', () => {
  let service: CheckOutServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOutServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
