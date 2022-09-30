import { TestBed } from '@angular/core/testing';

import { TemplesService } from './temples.service';

describe('TemplesService', () => {
  let service: TemplesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
