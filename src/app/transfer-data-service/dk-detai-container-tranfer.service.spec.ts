import { TestBed } from '@angular/core/testing';

import { DkDetaiContainerTranferService } from './dk-detai-container-tranfer.service';

describe('DkDetaiContainerTranferService', () => {
  let service: DkDetaiContainerTranferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DkDetaiContainerTranferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
