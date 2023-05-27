import { TestBed } from '@angular/core/testing';

import { HocphantienquyetService } from './hocphantienquyet.service';

describe('HocphantienquyetService', () => {
  let service: HocphantienquyetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HocphantienquyetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
