import { TestBed } from '@angular/core/testing';

import { DetaiSvService } from './detai-sv.service';

describe('DetaiSvService', () => {
  let service: DetaiSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetaiSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
