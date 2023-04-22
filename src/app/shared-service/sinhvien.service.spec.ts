import { TestBed } from '@angular/core/testing';

import { SinhvienService } from './sinhvien.service';

describe('SinhvienService', () => {
  let service: SinhvienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinhvienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
