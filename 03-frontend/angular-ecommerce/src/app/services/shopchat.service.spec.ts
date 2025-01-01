import { TestBed } from '@angular/core/testing';

import { ShopchatService } from './shopchat.service';

describe('ShopchatService', () => {
  let service: ShopchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
