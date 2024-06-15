import { TestBed } from '@angular/core/testing';

import { PlanStateService } from './plan-state.service';

describe('PlanStateService', () => {
  let service: PlanStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
