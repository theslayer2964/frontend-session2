import { TestBed } from '@angular/core/testing';

import { NhomSvService } from './nhom-sv.service';

describe('DetaiService', () => {
  let service: NhomSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhomSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
