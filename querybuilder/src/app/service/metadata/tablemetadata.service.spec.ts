import { TestBed } from '@angular/core/testing';

import { TablemetadataService } from './tablemetadata.service';

describe('TablemetadataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TablemetadataService = TestBed.get(TablemetadataService);
    expect(service).toBeTruthy();
  });
});
