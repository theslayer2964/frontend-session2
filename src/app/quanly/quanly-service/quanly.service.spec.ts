import { TestBed } from '@angular/core/testing';

import { QuanlyService } from './quanly.service';

describe('QuanlyService', () => {
  let service: QuanlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
