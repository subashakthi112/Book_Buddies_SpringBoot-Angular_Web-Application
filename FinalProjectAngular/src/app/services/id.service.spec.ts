import { TestBed } from '@angular/core/testing';

import { IdService } from './id.service';

describe('UserIdService', () => {
  let service: IdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
