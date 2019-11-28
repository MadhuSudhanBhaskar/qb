import { TestBed } from '@angular/core/testing';

import { QuerybuilderService } from './querybuilder.service';

describe('QuerybuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuerybuilderService = TestBed.get(QuerybuilderService);
    expect(service).toBeTruthy();
  });
});
