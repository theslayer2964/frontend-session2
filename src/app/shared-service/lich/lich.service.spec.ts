import { TestBed } from '@angular/core/testing';

import { LichService } from './lich.service';

describe('LichService', () => {
  let service: LichService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LichService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
