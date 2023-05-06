import { TestBed } from '@angular/core/testing';

import { PhieuChamService } from './phieu-cham.service';

describe('QuanlyService', () => {
  let service: PhieuChamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuChamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
