import { TestBed } from '@angular/core/testing';

import { GiangvienService } from './giangvien.service';

describe('GiangvienService', () => {
  let service: GiangvienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiangvienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
