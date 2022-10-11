import { TestBed } from '@angular/core/testing';

import { WumpusService } from './wumpus.service';

describe('WumpusService', () => {
  let service: WumpusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WumpusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
