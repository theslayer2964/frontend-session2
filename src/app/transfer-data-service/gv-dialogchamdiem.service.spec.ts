import { TestBed } from '@angular/core/testing';

import { GvDialogchamdiemService } from './gv-dialogchamdiem.service';

describe('GvDialogchamdiemService', () => {
  let service: GvDialogchamdiemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GvDialogchamdiemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
