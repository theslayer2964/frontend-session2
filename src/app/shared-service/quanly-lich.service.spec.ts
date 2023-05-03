import { TestBed } from '@angular/core/testing';

import { QuanlyLichService } from './quanly-lich.service';

describe('QuanlyLichService', () => {
  let service: QuanlyLichService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanlyLichService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
