import { TestBed } from '@angular/core/testing';

import { LopHocPhanService } from './lop-hoc-phan.service';

describe('LopHocPhanService', () => {
  let service: LopHocPhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LopHocPhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
