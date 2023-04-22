import { TestBed } from '@angular/core/testing';

import { ThemNhomTransferService } from './them-nhom-transfer.service';

describe('ThemNhomTransferService', () => {
  let service: ThemNhomTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemNhomTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
