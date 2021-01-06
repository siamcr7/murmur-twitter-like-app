import { TestBed } from '@angular/core/testing';

import { MurmurTweetsStateService } from './murmur-tweets-state.service';

describe('MurmurTweetsStateService', () => {
  let service: MurmurTweetsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MurmurTweetsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
