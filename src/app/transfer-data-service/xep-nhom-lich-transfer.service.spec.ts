import { TestBed } from '@angular/core/testing';

import { XepNhomLichTransferService } from './xep-nhom-lich-transfer.service';

describe('XepNhomLichTransferService', () => {
  let service: XepNhomLichTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XepNhomLichTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
