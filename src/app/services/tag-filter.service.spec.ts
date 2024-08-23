import { TestBed } from '@angular/core/testing';

import { TagFilterService } from './tag-filter.service';

describe('TagFilterService', () => {
  let service: TagFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
