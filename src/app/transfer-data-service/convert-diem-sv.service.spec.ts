import { TestBed } from '@angular/core/testing';

import { ConvertDiemSVService } from './convert-diem-sv.service';

describe('ConvertDiemSVService', () => {
  let service: ConvertDiemSVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertDiemSVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
