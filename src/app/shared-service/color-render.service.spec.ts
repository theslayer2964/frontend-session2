import { TestBed } from '@angular/core/testing';

import { ColorRenderService } from './color-render.service';

describe('ColorRenderService', () => {
  let service: ColorRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
