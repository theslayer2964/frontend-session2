import { TestBed } from '@angular/core/testing';

import { ThemLichTransferService } from './them-lich-transfer.service';

describe('ThemLichTransferService', () => {
  let service: ThemLichTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemLichTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
